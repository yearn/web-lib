import type { TNDict } from '../types';
export type TChain = {
    chainID: string;
    name: string;
    displayName: string;
    coin: string;
    block_explorer: string;
    chain_swap?: {
        chainId: string;
        blockExplorerUrls: string[];
        chainName: string;
        rpcUrls: string[];
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: number;
        };
    };
};
declare const CHAINS: TNDict<TChain>;
export { CHAINS as chains };
export default CHAINS;
