import	{BigNumber, ethers}	from	'ethers';

type	TDefaultReqArgs = {
	chainID?: number,
	provider?: ethers.providers.Provider,
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
	gasLimit: BigNumber;
	gasUsed: BigNumber;
	baseFeePerGas?: null | BigNumber;
}

export type	TUseBlockReq = {
	blockHashOrBlockTag?: ethers.providers.BlockTag,
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
	raw: BigNumber,
	rawPrice: BigNumber,
	normalized: number,
	normalizedPrice: number,
	normalizedValue: number
}

export type	TUseBalanceReq = {
	for?: string,
	token?: string,
	refreshEvery?: 'block' | 'second' | 'minute' | 'hour' | number | undefined
} & TDefaultReqArgs

export type	TUseBalanceRes = {
	data: TBalanceData,
	update: () => Promise<void>,
	error?: Error,
	status: 'error' | 'loading' | 'success' | 'unknown'
} & TDefaultStatus 


/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBalances hook.
******************************************************************************/
export type	TUseBalancesReq = {
	key: string | number,
	tokens: {
		token?: string,
		for?: string,
	}[]
	refreshEvery?: 'block' | 'second' | 'minute' | 'hour' | number | undefined
} & TDefaultReqArgs

export type	TUseBalancesRes = {
	data: {
		[key: string]: TBalanceData
	},
	update: () => Promise<void>,
	error?: Error,
	status: 'error' | 'loading' | 'success' | 'unknown'
} & TDefaultStatus 


/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useAccount hook.
******************************************************************************/
export type	TUseAccountRes = {
	address: string | null | undefined,
	ens: string | undefined,
	provider: ethers.providers.Provider,
	isConnecting: boolean,
	isReconnecting: boolean,
	isConnected: boolean,
	isDisconnected: boolean,
	status: 'reconnecting' | 'connecting' | 'connected' | 'disconnected'
}