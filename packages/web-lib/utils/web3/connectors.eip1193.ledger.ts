/* eslint-disable @typescript-eslint/no-explicit-any */

import EventEmitter from 'eventemitter3';

const DEFAULT_TARGET_ORIGIN = '*'; // By default post to any origin
const DEFAULT_TIMEOUT_MILLISECONDS = 240000; // By default timeout is 60 seconds
const JSON_RPC_VERSION = '2.0';

// The interface for the source of the events, typically the window.
export type TMinimalEventSourceInterface = {
	addEventListener(
		eventType: 'message',
		handler: (message: MessageEvent) => void
	): void;
}

// The interface for the target of our events, typically the parent window.
export type TMinimalEventTargetInterface = {
	postMessage(message: any, targetOrigin?: string): void;
}

/**
 * Options for constructing the iframe ethereum provider.
 */
type TIFrameEthereumProviderOptions = {
	targetOrigin?: string; // The origin to communicate with. Default '*'
	timeoutMilliseconds?: number; // How long to time out waiting for responses. Default 60 seconds.
	eventSource?: TMinimalEventSourceInterface; // The event source. By default we use the window.
	eventTarget?: TMinimalEventTargetInterface; // The event target.
}

/**
 * This is what we store in the state to keep track of pending promises.
 */
type TPromiseCompleter<TResult, TErrorData> = {
	// A response was received (either error or result response).
	resolve(
		result:
		| TJsonRpcSucessfulResponseMessage<TResult>
		| TJsonRpcErrorResponseMessage<TErrorData>
	): void;

	// An error with executing the request was encountered.
	reject(error: Error): void;
}

type TMessageId = number | string | null;

type TJsonRpcRequestMessage<TParams = any> = {
	jsonrpc: '2.0';
	// Optional in the request.
	id?: TMessageId;
	method: string;
	params?: TParams;
}

type TBaseJsonRpcResponseMessage = {
	// Required but null if not identified in request
	id: TMessageId;
	jsonrpc: '2.0';
}

type TJsonRpcSucessfulResponseMessage<TResult = any> = {
	result: TResult;
} & TBaseJsonRpcResponseMessage

type TJsonRpcError<TData = any> = {
	code: number;
	message: string;
	data?: TData;
}

type TJsonRpcErrorResponseMessage<TErrorData = any> = {
	error: TJsonRpcError<TErrorData>;
} & TBaseJsonRpcResponseMessage

type TReceivedMessageType =
  | TJsonRpcRequestMessage
  | TJsonRpcErrorResponseMessage
  | TJsonRpcSucessfulResponseMessage;

/**
 * We return a random number between the 0 and the maximum safe integer so that we always generate a unique identifier,
 * across all communication channels.
 */
function getUniqueId(): number {
	return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export type TIFrameEthereumProviderEventTypes =
  | 'connect'
  | 'close'
  | 'notification'
  | 'chainChanged'
  | 'networkChanged'
  | 'accountsChanged';

/**
 * Export the type information about the different events that are emitted.
 */
export type TIFrameEthereumProvider = {
	on(event: 'connect', handler: () => void): unknown;

	on(event: 'close', handler: (code: number, reason: string) => void): unknown;

	on(event: 'notification', handler: (result: any) => void): unknown;

	on(event: 'chainChanged', handler: (chainId: string) => void): unknown;

	on(event: 'networkChanged', handler: (networkId: string) => void): unknown;

	on(event: 'accountsChanged', handler: (accounts: string[]) => void): unknown;
}

/**
 * Represents an error in an RPC returned from the event source. Always contains a code and a reason. The message
 * is constructed from both.
 */
export class RpcError extends Error {
	public readonly isRpcError = true as const;

	public readonly code: number;
	public readonly reason: string;

	constructor(code: number, reason: string) {
		super(`${code}: ${reason}`);

		this.code = code;
		this.reason = reason;
	}
}

/**
 * This is the primary artifact of this library.
 */
export class IFrameEthereumProvider extends EventEmitter<TIFrameEthereumProviderEventTypes> {
	/**
   * Differentiate this provider from other providers by providing an isIFrame property that always returns true.
   */
	public get isIFrame(): true {
		return true;
	}

	/**
   * Always return this for currentProvider.
   */
	public get currentProvider(): TIFrameEthereumProvider {
		return this;
	}

	private enabled: Promise<string[]> | null = null;
	private readonly targetOrigin: string;
	private readonly timeoutMilliseconds: number;
	private eventSource: TMinimalEventSourceInterface | undefined;
	private eventTarget: TMinimalEventTargetInterface | undefined;
	private readonly completers: {
		[id: string]: TPromiseCompleter<any, any>;
	} = {};

	public constructor({
		targetOrigin = DEFAULT_TARGET_ORIGIN,
		timeoutMilliseconds = DEFAULT_TIMEOUT_MILLISECONDS,
		eventSource = window,
		eventTarget = window.parent
	}: TIFrameEthereumProviderOptions = {}) {
		// Call super for `this` to be defined
		super();

		this.targetOrigin = targetOrigin;
		this.timeoutMilliseconds = timeoutMilliseconds;

		this.eventSource = eventSource;
		this.eventTarget = eventTarget;
		// Listen for messages from the event source.
		this.eventSource.addEventListener('message', this.handleEventSourceMessage);
	}

	/**
   * Helper method that handles transport and request wrapping
   * @param method method to execute
   * @param params params to pass the method
   * @param requestId jsonrpc request id
   */
	private async execute<TParams, TResult, TErrorData>(
		method: string,
		params?: TParams,
		requestId?: TMessageId
	): Promise<
		| TJsonRpcSucessfulResponseMessage<TResult>
		| TJsonRpcErrorResponseMessage<TErrorData>
		> {
		const id = requestId ? requestId : getUniqueId();
		const payload: TJsonRpcRequestMessage = {
			jsonrpc: JSON_RPC_VERSION,
			id,
			method,
			...(typeof params === 'undefined' ? null : {params})
		};

		const promise = new Promise<
		| TJsonRpcSucessfulResponseMessage<TResult>
		| TJsonRpcErrorResponseMessage<TErrorData>
		>((resolve, reject): unknown => (this.completers[id] = {resolve, reject}));

		// Send the JSON RPC to the event source.
		if (this.eventTarget) {
			this.eventTarget.postMessage(payload, this.targetOrigin);
		}

		// Delete the completer within the timeout and reject the promise.
		setTimeout((): void => {
			if (this.completers[id]) {
				this.completers[id].reject(
					new Error(
						`RPC ID "${id}" (${method}) timed out after ${this.timeoutMilliseconds} milliseconds`
					)
				);
				delete this.completers[id];
			}
		}, this.timeoutMilliseconds);

		return promise;
	}

	/**
   * Send the JSON RPC and return the result.
   * @param method method to send to the parent provider
   * @param params parameters to send
   */
	public async request<TParams = any[]>(payload: {
		method: string,
		params?: TParams,
		id?: TMessageId
	}): Promise<any> {
		const	res = await this.send(payload.method, payload.params);
		return res;
	}

	/**
   * Send the JSON RPC and return the result.
   * @param method method to send to the parent provider
   * @param params parameters to send
   */
	public async send<TParams = any[], TResult = any>(
		method: string,
		params?: TParams
	): Promise<TResult> {
		const response = await this.execute<TParams, TResult, any>(method, params);
		if ('error' in response) {
			throw new RpcError(response.error.code, response.error.message);
		} else {
			return response.result;
		}
	}

	/**
   * Request the parent window to enable access to the user's web3 provider. Return accounts list immediately if already enabled.
   */
	public async enable(): Promise<string[]> {
		if (this.enabled === null) {
			const promise = (this.enabled = this.send('enable').catch((error): void => {
				// Clear this.enabled if it's this promise so we try again next call.
				// this.enabled might be set from elsewhere if, e.g. the accounts changed event is emitted
				if (this.enabled === promise) {
					this.enabled = null;
				}
				// Rethrow the error.
				throw error;
			}));
		}

		return this.enabled;
	}

	/**
   * Backwards compatibility method for web3.
   * @param payload payload to send to the provider
   * @param callback callback to be called when the provider resolves
   */
	public async sendAsync(
		payload: { method: string; params?: any[]; id?: TMessageId },
		callback: (
			error: string | null,
			result: { method: string; params?: any[]; result: any } | any
		) => void
	): Promise<void> {
		try {
			const result = await this.execute(
				payload.method,
				payload.params,
				payload.id
			);

			callback(null, result);
		} catch (error) {
			callback(error as string, null);
		}
	}

	/**
   * Handle a message on the event source.
   * @param event message event that will be processed by the provider
   */
	private handleEventSourceMessage = (event: MessageEvent): void => {
		const {data} = event;

		// No data to parse, skip.
		if (!data) {
			return;
		}

		const message = data as TReceivedMessageType;

		// Always expect jsonrpc to be set to '2.0'
		if (message.jsonrpc !== JSON_RPC_VERSION) {
			return;
		}

		// If the message has an ID, it is possibly a response message
		if (typeof message.id !== 'undefined' && message.id !== null) {
			const completer = this.completers['' + message.id];

			// True if we haven't timed out and this is a response to a message we sent.
			if (completer) {
				// Handle pending promise
				if ('error' in message || 'result' in message) {
					completer.resolve(message);
				} else {
					completer.reject(
						new Error('Response from provider did not have error or result key')
					);
				}

				delete this.completers[message.id];
			}
		}

		// If the method is a request from the parent window, it is likely a subscription.
		if ('method' in message) {
			switch (message.method) {
				case 'notification':
					this.emitNotification(message.params);
					break;

				case 'connect':
					this.emitConnect();
					break;

				case 'close':
					this.emitClose(message.params[0], message.params[1]);
					break;

				case 'chainChanged':
					this.emitChainChanged(message.params[0]);
					break;

				case 'networkChanged':
					this.emitNetworkChanged(message.params[0]);
					break;

				case 'accountsChanged':
					this.emitAccountsChanged(message.params[0]);
					break;
			}
		}
	};

	private emitNotification(result: any): void {
		this.emit('notification', result);
	}

	private emitConnect(): void {
		// If the provider isn't enabled but it emits a connect event, assume that it's enabled and initialize
		// with an empty list of accounts.
		if (this.enabled === null) {
			this.enabled = Promise.resolve([]);
		}
		this.emit('connect');
	}

	private emitClose(code: number, reason: string): void {
		this.emit('close', code, reason);
	}

	private emitChainChanged(chainId: string): void {
		this.emit('chainChanged', chainId);
	}

	private emitNetworkChanged(networkId: string): void {
		this.emit('networkChanged', networkId);
	}

	private emitAccountsChanged(accounts: string[]): void {
		this.enabled = Promise.resolve(accounts);
		this.emit('accountsChanged', accounts);
	}
}
