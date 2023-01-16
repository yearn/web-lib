import EventEmitter from 'eventemitter3';
export type TMinimalEventSourceInterface = {
    addEventListener(eventType: 'message', handler: (message: MessageEvent) => void): void;
};
export type TMinimalEventTargetInterface = {
    postMessage(message: any, targetOrigin?: string): void;
};
type TIFrameEthereumProviderOptions = {
    targetOrigin?: string;
    timeoutMilliseconds?: number;
    eventSource?: TMinimalEventSourceInterface;
    eventTarget?: TMinimalEventTargetInterface;
};
type TMessageId = number | string | null;
export type TIFrameEthereumProviderEventTypes = 'connect' | 'close' | 'notification' | 'chainChanged' | 'networkChanged' | 'accountsChanged';
export type TIFrameEthereumProvider = {
    on(event: 'connect', handler: () => void): unknown;
    on(event: 'close', handler: (code: number, reason: string) => void): unknown;
    on(event: 'notification', handler: (result: any) => void): unknown;
    on(event: 'chainChanged', handler: (chainId: string) => void): unknown;
    on(event: 'networkChanged', handler: (networkId: string) => void): unknown;
    on(event: 'accountsChanged', handler: (accounts: string[]) => void): unknown;
};
export declare class RpcError extends Error {
    readonly isRpcError: true;
    readonly code: number;
    readonly reason: string;
    constructor(code: number, reason: string);
}
export declare class IFrameEthereumProvider extends EventEmitter<TIFrameEthereumProviderEventTypes> {
    get isIFrame(): true;
    get currentProvider(): TIFrameEthereumProvider;
    private enabled;
    private readonly targetOrigin;
    private readonly timeoutMilliseconds;
    private eventSource;
    private eventTarget;
    private readonly completers;
    constructor({ targetOrigin, timeoutMilliseconds, eventSource, eventTarget }?: TIFrameEthereumProviderOptions);
    private execute;
    request<TParams = any[]>(payload: {
        method: string;
        params?: TParams;
        id?: TMessageId;
    }): Promise<any>;
    send<TParams = any[], TResult = any>(method: string, params?: TParams): Promise<TResult>;
    enable(): Promise<string[]>;
    sendAsync(payload: {
        method: string;
        params?: any[];
        id?: TMessageId;
    }, callback: (error: string | null, result: {
        method: string;
        params?: any[];
        result: any;
    } | any) => void): Promise<void>;
    private handleEventSourceMessage;
    private emitNotification;
    private emitConnect;
    private emitClose;
    private emitChainChanged;
    private emitNetworkChanged;
    private emitAccountsChanged;
}
export {};
