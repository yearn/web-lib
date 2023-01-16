import { Provider } from 'ethcall';
import { ethers } from 'ethers';
export declare const envRPCURI: {
    [key: number]: string;
};
export declare function replaceEnvRPCURI(key: number, value: string): void;
export declare function newEthCallProvider(provider: ethers.providers.Provider): Promise<Provider>;
export declare function getProvider(chain?: number): ethers.providers.BaseProvider | ethers.providers.Web3Provider;
export declare function getRPC(chainID?: number): string;
export declare function fromRPC(rpcURI: string): ethers.providers.BaseProvider | ethers.providers.Web3Provider;
