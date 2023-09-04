import type {BlockTag} from 'viem';
import type {Connector} from 'wagmi';

type TDefaultReqArgs = {
	chainID?: number,
	provider?: Connector,
}

type TDefaultResArgs = {
	error?: Error,
	isLoading: boolean,
	isSuccess: boolean,
	isError: boolean,
}

export type TDefaultMinimalStatus = {
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}
export type TDefaultStatus = {
	isFetching: boolean
	isFetched: boolean
	isRefetching: boolean
} & TDefaultMinimalStatus

/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBlock hook.
******************************************************************************/
export type TBlock = {
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

export type TUseBlockReq = {
	blockHashOrBlockTag?: BlockTag,
	shouldWatch?: boolean,
	shouldShallowWatch?: boolean,
	shallowCallback?: (block: TBlock, error?: Error) => void
} & TDefaultReqArgs;

export type TUseBlockRes = {
	data: TBlock
} & TDefaultResArgs;

/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBalance hook.
******************************************************************************/
export type TBalanceData = {
	decimals: number,
	symbol: string,
	name: string,
	raw: bigint,
	normalized: number,
	//Optional
	rawPrice?: bigint,
	normalizedPrice?: number,
	normalizedValue?: number
	force?: boolean,
}
