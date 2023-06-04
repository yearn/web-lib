import type {DependencyList} from 'react';
import type {BlockTag} from 'viem';
import type {Connector} from 'wagmi';
import type {TDict} from '@yearn-finance/web-lib/types';

type	TDefaultReqArgs = {
	chainID?: number,
	provider?: Connector,
}

type	TDefaultResArgs = {
	error?: Error,
	isLoading: boolean,
	isSuccess: boolean,
	isError: boolean,
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
** Request, Response and helpers for the useBlock hook.
******************************************************************************/
export type	TBlock = {
	hash: string;
	parentHash: string;
	miner: string;
	extraData: string;
	nonce: string;
	number: number;
	timestamp: number;
	difficulty: number;
	gasLimit: bigint;
	gasUsed: bigint;
	baseFeePerGas?: null | bigint;
}

export type	TUseBlockReq = {
	blockHashOrBlockTag?: BlockTag,
	shouldWatch?: boolean,
	shouldShallowWatch?: boolean,
	shallowCallback?: (block: TBlock, error?: Error) => void
} & TDefaultReqArgs;

export type	TUseBlockRes = {
	data: TBlock
} & TDefaultResArgs;

/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBalance hook.
******************************************************************************/
export type	TBalanceData = {
	decimals: number,
	symbol: string,
	name: string,
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
