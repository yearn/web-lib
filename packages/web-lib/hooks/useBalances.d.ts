import { ethers } from 'ethers';
import type { DependencyList } from 'react';
import type { TBalanceData, TDefaultStatus } from '@yearn-finance/web-lib/hooks/types';
import type { TDict } from '@yearn-finance/web-lib/utils/types';
type TDefaultReqArgs = {
    chainID?: number;
    provider?: ethers.providers.Provider;
};
export type TUseBalancesTokens = {
    token: string;
    for?: string;
};
export type TUseBalancesReq = {
    key?: string | number;
    tokens: TUseBalancesTokens[];
    prices?: {
        [token: string]: string;
    };
    refreshEvery?: 'block' | 'second' | 'minute' | 'hour' | number;
    effectDependencies?: DependencyList;
} & TDefaultReqArgs;
export type TUseBalancesRes = {
    data: TDict<TBalanceData>;
    update: () => Promise<TDict<TBalanceData>>;
    updateSome: (token: TUseBalancesTokens[]) => Promise<TDict<TBalanceData>>;
    error?: Error;
    status: 'error' | 'loading' | 'success' | 'unknown';
    nonce: number;
} & TDefaultStatus;
export declare function useBalances(props?: TUseBalancesReq): TUseBalancesRes;
export {};
