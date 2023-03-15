import type {DependencyList} from 'react';
import type {TWeb3Provider} from '@yearn-finance/web-lib/contexts/types';
import type {TDict} from '@yearn-finance/web-lib/types';

type	TDefaultReqArgs = {
	chainID?: number,
	provider?: TWeb3Provider,
}

export type	TDefaultMinimalStatus = {
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}
export type	TDefaultStatus = {
	isFetching: boolean
	isFetched: boolean
	isRefetching: boolean
} & TDefaultMinimalStatus

/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBalance hook.
******************************************************************************/
export type	TBalanceData = {
	symbol: string,
	decimals: bigint,
	raw: bigint,
	rawPrice: bigint,
	normalized: number,
	normalizedPrice: number,
	normalizedValue: number
}

/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBalances hook.
******************************************************************************/
export type	TUseBalancesTokens = {
	token: string,
	for?: string,
}
export type	TUseBalancesReq = {
	key?: string | number,
	tokens: TUseBalancesTokens[]
	prices?: {
		[token: string]: string,
	}
	refreshEvery?: 'block' | 'second' | 'minute' | 'hour' | number,
	effectDependencies?: DependencyList
} & TDefaultReqArgs

export type	TUseBalancesRes = {
	data: TDict<TBalanceData>,
	update: () => Promise<TDict<TBalanceData>>,
	updateSome: (token: TUseBalancesTokens[]) => Promise<TDict<TBalanceData>>,
	error?: Error,
	status: 'error' | 'loading' | 'success' | 'unknown'
} & TDefaultStatus


/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useAccount hook.
******************************************************************************/
export type	TUseAccountRes = {
	address: string | null | undefined,
	ens: string | undefined,
	lensProtocolHandle: string | undefined,
	provider: TWeb3Provider,
	isConnecting: boolean,
	isReconnecting: boolean,
	isConnected: boolean,
	isDisconnected: boolean,
	status: 'reconnecting' | 'connecting' | 'connected' | 'disconnected'
}
