import { Connector } from '@web3-react/types';
function parseChainId(chainId) {
    return typeof chainId === 'string' ? Number.parseInt(chainId, 16) : chainId;
}
export class EIP1193 extends Connector {
    constructor({ actions, provider }) {
        super(actions);
        this.provider = provider;
    }
    init(provider) {
        this.provider = provider;
        this.provider.on('connect', ({ chainId }) => {
            this.actions.update({ chainId: parseChainId(chainId) });
        });
        this.provider.on('disconnect', (error) => {
            this.onError?.(error);
        });
        this.provider.on('close', (error) => {
            this.onError?.(error);
        });
        this.provider.on('chainChanged', (chainId) => {
            this.actions.update({ chainId: parseChainId(chainId) });
        });
        this.provider.on('accountsChanged', (accounts) => {
            this.actions.update({ accounts });
        });
    }
    async connectEagerly() {
        const cancelActivation = this.actions.startActivation();
        return Promise.all([
            this.provider?.request({ method: 'eth_chainId' }),
            this.provider?.request({ method: 'eth_requestAccounts' })
                .catch(async () => this.provider?.request({ method: 'eth_accounts' }))
        ]).then(([chainId, accounts]) => {
            this.actions.update({ chainId: parseChainId(chainId), accounts });
        }).catch((error) => {
            console.debug('Could not connect eagerly', error);
            cancelActivation();
        });
    }
    async activate() {
        const cancelActivation = this.actions.startActivation();
        return Promise.all([
            this.provider?.request({ method: 'eth_chainId' }),
            this.provider?.request({ method: 'eth_accounts' })
        ]).then(([chainId, accounts]) => {
            this.actions.update({ chainId: parseChainId(chainId), accounts });
        }).catch((error) => {
            this.onError?.(error);
            cancelActivation();
        });
    }
}
