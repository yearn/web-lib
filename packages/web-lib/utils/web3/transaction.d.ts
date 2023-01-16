import type { ethers } from 'ethers';
import type React from 'react';
declare const defaultTxStatus: {
    none: boolean;
    pending: boolean;
    success: boolean;
    error: boolean;
};
export type TTxStatus = {
    none: boolean;
    pending: boolean;
    success: boolean;
    error: boolean;
};
declare class Transaction {
    provider: ethers.providers.Web3Provider | ethers.providers.Provider;
    onStatus: React.Dispatch<React.SetStateAction<TTxStatus>>;
    options?: {
        shouldIgnoreSuccessTxStatusChange: boolean;
    };
    txArgs?: unknown[];
    funcCall: (...props: never) => Promise<boolean>;
    successCall?: () => Promise<void>;
    constructor(provider: ethers.providers.Web3Provider | ethers.providers.Provider, funcCall: (...props: never) => Promise<boolean>, onStatus: React.Dispatch<React.SetStateAction<TTxStatus>>, options?: {
        shouldIgnoreSuccessTxStatusChange: boolean;
    });
    populate(...txArgs: unknown[]): Transaction;
    onSuccess(onSuccess: () => Promise<void>): Transaction;
    perform(): Promise<boolean>;
}
export { defaultTxStatus, Transaction };
