import type { ReactElement } from 'react';
export type TWalletProvider = {
    isFrame?: boolean;
    isCoinbaseWallet?: boolean;
    isCoinbaseBrowser?: boolean;
    isMetaMask?: boolean;
    isTrustWallet?: boolean;
    isTrust?: boolean;
    isPhantom?: boolean;
};
export type TInjectedWallet = {
    name: string;
    icon: ReactElement;
    type: ('NONE' | 'INJECTED' | 'INJECTED_COINBASE' | 'WALLET_CONNECT' | 'EMBED_LEDGER' | 'EMBED_GNOSIS_SAFE' | 'EMBED_COINBASE' | 'EMBED_TRUSTWALLET');
};
export declare function useInjectedWallet(): TInjectedWallet;
