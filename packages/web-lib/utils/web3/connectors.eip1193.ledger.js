import EventEmitter from 'eventemitter3';
const DEFAULT_TARGET_ORIGIN = '*';
const DEFAULT_TIMEOUT_MILLISECONDS = 240000;
const JSON_RPC_VERSION = '2.0';
function getUniqueId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
export class RpcError extends Error {
    isRpcError = true;
    code;
    reason;
    constructor(code, reason) {
        super(`${code}: ${reason}`);
        this.code = code;
        this.reason = reason;
    }
}
export class IFrameEthereumProvider extends EventEmitter {
    get isIFrame() {
        return true;
    }
    get currentProvider() {
        return this;
    }
    enabled = null;
    targetOrigin;
    timeoutMilliseconds;
    eventSource;
    eventTarget;
    completers = {};
    constructor({ targetOrigin = DEFAULT_TARGET_ORIGIN, timeoutMilliseconds = DEFAULT_TIMEOUT_MILLISECONDS, eventSource = window, eventTarget = window.parent } = {}) {
        super();
        this.targetOrigin = targetOrigin;
        this.timeoutMilliseconds = timeoutMilliseconds;
        this.eventSource = eventSource;
        this.eventTarget = eventTarget;
        this.eventSource.addEventListener('message', this.handleEventSourceMessage);
    }
    async execute(method, params, requestId) {
        const id = requestId ? requestId : getUniqueId();
        const payload = {
            jsonrpc: JSON_RPC_VERSION,
            id,
            method,
            ...(typeof params === 'undefined' ? null : { params })
        };
        const promise = new Promise((resolve, reject) => (this.completers[id] = { resolve, reject }));
        if (this.eventTarget) {
            this.eventTarget.postMessage(payload, this.targetOrigin);
        }
        setTimeout(() => {
            if (this.completers[id]) {
                this.completers[id].reject(new Error(`RPC ID "${id}" (${method}) timed out after ${this.timeoutMilliseconds} milliseconds`));
                delete this.completers[id];
            }
        }, this.timeoutMilliseconds);
        return promise;
    }
    async request(payload) {
        const res = await this.send(payload.method, payload.params);
        return res;
    }
    async send(method, params) {
        const response = await this.execute(method, params);
        if ('error' in response) {
            throw new RpcError(response.error.code, response.error.message);
        }
        else {
            return response.result;
        }
    }
    async enable() {
        if (this.enabled === null) {
            const promise = (this.enabled = this.send('enable').catch((error) => {
                if (this.enabled === promise) {
                    this.enabled = null;
                }
                throw error;
            }));
        }
        return this.enabled;
    }
    async sendAsync(payload, callback) {
        try {
            const result = await this.execute(payload.method, payload.params, payload.id);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    handleEventSourceMessage = (event) => {
        const { data } = event;
        if (!data) {
            return;
        }
        const message = data;
        if (message.jsonrpc !== JSON_RPC_VERSION) {
            return;
        }
        if (typeof message.id !== 'undefined' && message.id !== null) {
            const completer = this.completers['' + message.id];
            if (completer) {
                if ('error' in message || 'result' in message) {
                    completer.resolve(message);
                }
                else {
                    completer.reject(new Error('Response from provider did not have error or result key'));
                }
                delete this.completers[message.id];
            }
        }
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
    emitNotification(result) {
        this.emit('notification', result);
    }
    emitConnect() {
        if (this.enabled === null) {
            this.enabled = Promise.resolve([]);
        }
        this.emit('connect');
    }
    emitClose(code, reason) {
        this.emit('close', code, reason);
    }
    emitChainChanged(chainId) {
        this.emit('chainChanged', chainId);
    }
    emitNetworkChanged(networkId) {
        this.emit('networkChanged', networkId);
    }
    emitAccountsChanged(accounts) {
        this.enabled = Promise.resolve(accounts);
        this.emit('accountsChanged', accounts);
    }
}
