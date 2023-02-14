import {Connector} from '@web3-react/types';

import type {Provider, ProviderConnectInfo, ProviderRpcError, Web3ReactStateUpdate} from '@web3-react/types';

export type TActions = {
	startActivation: () => () => void
	update: (stateUpdate: Web3ReactStateUpdate) => void
	reportError: (error: Error | undefined) => void
	resetState: () => void
}


export class NoFrameError extends Error {
	public constructor() {
		super('Frame not installed');
		this.name = NoFrameError.name;
		Object.setPrototypeOf(this, NoFrameError.prototype);
	}
}

function parseChainId(chainId: string): number {
	return Number.parseInt(chainId, 16);
}

type TFrameConnectorArguments = {
	infuraId?: string
	alchemyId?: string
	origin?: string
}

type TFrameProvider = (a: 'frame', b?: TFrameConnectorArguments) => Provider

export class Frame extends Connector {
	private readonly options?: TFrameConnectorArguments;
	private eagerConnection?: Promise<void>;

	constructor(actions: TActions, options?: TFrameConnectorArguments, connectEagerly = false) {
		super(actions);
		this.options = options;

		if (connectEagerly) {
			this.eagerConnection = this.initialize(connectEagerly);
		}
	}

	private async initialize(connectEagerly: boolean): Promise<void> {
		const ethProvider = await import('eth-provider').then((m: { default: TFrameProvider }): TFrameProvider => m.default);

		try {
			this.provider = ethProvider('frame', this.options);
		} catch (error) {
			(this.actions as TActions).reportError(error as Error);
		}

		if (this.provider) {
			this.provider.on('connect', ({chainId}: ProviderConnectInfo): void => {
				(this.actions as TActions).update({chainId: parseChainId(chainId)});
			});
			this.provider.on('disconnect', (error: ProviderRpcError): void => {
				(this.actions as TActions).reportError(error);
			});
			this.provider.on('chainChanged', (chainId: string): void => {
				(this.actions as TActions).update({chainId: parseChainId(chainId)});
			});
			this.provider.on('accountsChanged', (accounts: string[]): void => {
				(this.actions as TActions).update({accounts});
			});

			if (connectEagerly) {
				return Promise.all([
					this.provider.request({method: 'eth_chainId'}) as Promise<string>,
					this.provider.request({method: 'eth_accounts'}) as Promise<string[]>
				])
					.then(([chainId, accounts]): void => {
						if (accounts?.length > 0) {
							(this.actions as TActions).update({chainId: parseChainId(chainId), accounts});
						}
					})
					.catch((error): void => {
						console.debug('Could not connect eagerly', error);
					});
			}
		}
	}

	public async activate(): Promise<void> {
		(this.actions as TActions).startActivation();

		if (!this.eagerConnection) {
			this.eagerConnection = this.initialize(false);
		}
		await this.eagerConnection;

		if (!this.provider) {
			return (this.actions as TActions).reportError(new NoFrameError());
		}

		return Promise.all([
			this.provider.request({method: 'eth_chainId'}) as Promise<string>,
			this.provider.request({method: 'eth_requestAccounts'}) as Promise<string[]>
		])
			.then(([chainId, accounts]): void => {
				const receivedChainId = parseChainId(chainId);

				(this.actions as TActions).update({chainId: receivedChainId, accounts});
			})
			.catch((error: Error): void => {
				(this.actions as TActions).reportError(error);
			});
	}
}
