import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {erc20ABI, multicall} from '@wagmi/core';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import AGGREGATE3_ABI from '@yearn-finance/web-lib/utils/abi/aggregate.abi';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {ETH_TOKEN_ADDRESS, MULTICALL3_ADDRESS, VLYCRV_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, WFTM_TOKEN_ADDRESS} from '@yearn-finance/web-lib/utils/constants';
import {decodeAsBigInt, decodeAsNumber, decodeAsString} from '@yearn-finance/web-lib/utils/decoder';
import {toNormalizedValue} from '@yearn-finance/web-lib/utils/format';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';

import type {DependencyList} from 'react';
import type {ContractFunctionConfig} from 'viem';
import type {Connector} from 'wagmi';
import type {TAddress, TDict} from '@yearn-finance/web-lib/types';
import type {TBalanceData, TDefaultStatus} from '@yearn-finance/web-lib/types/hooks';

/* 🔵 - Yearn Finance **********************************************************
** Request, Response and helpers for the useBalances hook.
******************************************************************************/
type	TDefaultReqArgs = {
	chainID?: number,
	provider?: Connector,
}
export type	TUseBalancesTokens = {
	token: string,
	for?: string,
}
export type	TUseBalancesReq = {
	key?: string | number,
	tokens: TUseBalancesTokens[]
	prices?: TDict<bigint>,
	refreshEvery?: 'block' | 'second' | 'minute' | 'hour' | number,
	effectDependencies?: DependencyList
} & TDefaultReqArgs

export type	TUseBalancesRes = {
	data: TDict<TBalanceData>,
	update: () => Promise<TDict<TBalanceData>>,
	updateSome: (token: TUseBalancesTokens[]) => Promise<TDict<TBalanceData>>,
	error?: Error,
	status: 'error' | 'loading' | 'success' | 'unknown',
	nonce: number
} & TDefaultStatus

type TDataRef = {
	nonce: number,
	address: TAddress,
	balances: TDict<TBalanceData>,
}

/* 🔵 - Yearn Finance **********************************************************
** Default status for the loading state.
******************************************************************************/
const		defaultStatus = {
	isLoading: false,
	isFetching: false,
	isSuccess: false,
	isError: false,
	isFetched: false,
	isRefetching: false
};

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to fetch balance information for any ERC20 tokens.
**************************************************************************/
export function	useBalances(props?: TUseBalancesReq): TUseBalancesRes {
	const	{address: web3Address, isActive, provider} = useWeb3();
	const	{chainID: web3ChainID} = useChainID();
	const	[nonce, set_nonce] = useState(0);
	const	[status, set_status] = useState<TDefaultStatus>(defaultStatus);
	const	[error, set_error] = useState<Error | undefined>(undefined);
	const	[balances, set_balances] = useState<TDict<TBalanceData>>({});
	const	data = useRef<TDataRef>({nonce: 0, address: toAddress(), balances: {}});
	const	interval = useRef<NodeJS.Timer>();
	const	effectDependencies = props?.effectDependencies || [];

	/* 🔵 - Yearn Finance ******************************************************
	** When this hook is called, it will fetch the informations for the
	** specified list of tokens. If no props are specified, the default values
	** will be used.
	**************************************************************************/
	const stringifiedTokens = useMemo((): string => JSON.stringify(props?.tokens || []), [props?.tokens]);

	const getBalances = useCallback(async (tokenList: string): Promise<[TDict<TBalanceData>, Error | undefined]> => {
		const	tokens = JSON.parse(tokenList) || [];
		if (!isActive || !web3Address || tokens.length === 0) {
			return [{}, undefined];
		}

		const	calls: ContractFunctionConfig[] = [];
		for (const element of tokens) {
			const {token} = element;
			const ownerAddress = (element?.for || web3Address) as string;
			const isEth = toAddress(token) === ETH_TOKEN_ADDRESS;
			if (isEth) {
				const tokenAddress = web3ChainID === 250 ? WFTM_TOKEN_ADDRESS : WETH_TOKEN_ADDRESS;
				calls.push({address: MULTICALL3_ADDRESS, abi: AGGREGATE3_ABI, functionName: 'getEthBalance', args: [ownerAddress]});
				calls.push({address: tokenAddress, abi: erc20ABI, functionName: 'decimals'});
				calls.push({address: tokenAddress, abi: erc20ABI, functionName: 'symbol'});
			} else {
				calls.push({address: token, abi: erc20ABI, functionName: 'balanceOf', args: [ownerAddress]});
				calls.push({address: token, abi: erc20ABI, functionName: 'decimals'});
				calls.push({address: token, abi: erc20ABI, functionName: 'symbol'});
			}
		}

		const	_data: TDict<TBalanceData> = {};
		try {
			let	 rIndex = 0;
			const results = await multicall({contracts: calls as never[]});
			for (const element of tokens) {
				const {token} = element;
				const balanceOfResult = results[rIndex++];
				const decimalsResult = results[rIndex++];
				const symbolResult = results[rIndex++];
				const balanceOf = decodeAsBigInt(balanceOfResult);
				const rawPrice = props?.prices?.[toAddress(token)] || 0n;
				let decimals = decodeAsNumber(decimalsResult);
				let symbol = decodeAsString(symbolResult);
				if (toAddress(token) === ETH_TOKEN_ADDRESS) {
					symbol = 'ETH';
				}
				if (toAddress(token) === VLYCRV_TOKEN_ADDRESS) {
					decimals = 18;
				}
				_data[toAddress(token)] = {
					decimals: Number(decimals),
					symbol: symbol,
					raw: balanceOf,
					rawPrice,
					normalized: toNormalizedValue(balanceOf, Number(decimals)),
					normalizedPrice: toNormalizedValue(rawPrice, 6),
					normalizedValue: (toNormalizedValue(balanceOf, Number(decimals)) * toNormalizedValue(rawPrice, 6))
				};
			}
			return [_data, undefined];
		} catch (_error) {
			return [{}, _error as Error];
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActive, web3Address, props?.chainID, props?.prices, web3ChainID, provider, ...effectDependencies]);

	/* 🔵 - Yearn Finance ******************************************************
	** Add an interval to update the balance every X time, based on the
	** refreshEvery prop. This specific effect is not used if the refresh is
	** not set or if it is set to 'block'.
	**************************************************************************/
	useEffect((): () => void => {
		if (props?.refreshEvery && props?.refreshEvery !== 'block') {
			let	delay = props.refreshEvery;
			if (delay === 'second') {
				delay = 1 * 1000;
			} else if (delay === 'minute') {
				delay = 60 * 1000;
			} else if (delay === 'hour') {
				delay = 60 * 60 * 1000;
			}
			interval.current = setInterval((): void => {
				getBalances(stringifiedTokens);
			}, delay as number);
			return (): void => clearInterval(interval.current);
		}
		return (): void => undefined;
	}, [getBalances, props?.refreshEvery, stringifiedTokens]);

	const	onUpdate = useCallback(async (): Promise<TDict<TBalanceData>> => {
		set_status({...defaultStatus, isLoading: true, isFetching: true, isRefetching: defaultStatus.isFetched});

		const	[newRawData, err] = await getBalances(stringifiedTokens);
		if (toAddress(web3Address as string) !== data.current.address) {
			data.current.balances = {};
		}
		data.current.address = toAddress(web3Address as string);

		for (const [address, element] of Object.entries(newRawData)) {
			data.current.balances[address] = {
				...data.current.balances[address],
				...element
			};
		}
		data.current.nonce += 1;

		performBatchedUpdates((): void => {
			set_nonce((n): number => n + 1);
			set_balances(data.current.balances);
			set_error(err as Error);
			set_status({...defaultStatus, isSuccess: true, isFetched: true});
		});
		return data.current.balances;
	}, [getBalances, stringifiedTokens, web3Address]);

	const	onUpdateSome = useCallback(async (tokenList: TUseBalancesTokens[]): Promise<TDict<TBalanceData>> => {
		set_status({...defaultStatus, isLoading: true, isFetching: true, isRefetching: defaultStatus.isFetched});

		const	stringifiedSomeTokens = JSON.stringify(tokenList);
		const	[newRawData, err] = await getBalances(stringifiedSomeTokens);
		if (toAddress(web3Address as string) !== data.current.address) {
			data.current.balances = {};
		}
		data.current.address = toAddress(web3Address as string);

		for (const [address, element] of Object.entries(newRawData)) {
			data.current.balances[address] = {
				...data.current.balances[address],
				...element
			};
		}
		data.current.nonce += 1;

		performBatchedUpdates((): void => {
			set_nonce((n): number => n + 1);
			set_balances(data.current.balances);
			set_error(err as Error);
			set_status({...defaultStatus, isSuccess: true, isFetched: true});
		});
		return data.current.balances;
	}, [getBalances, web3Address]);

	const assignPrices = useCallback((_rawData: TDict<TBalanceData>): TDict<TBalanceData> => {
		for (const key of Object.keys(_rawData)) {
			const	tokenAddress = toAddress(key);
			const	rawPrice = props?.prices?.[tokenAddress] || 0n;
			_rawData[tokenAddress] = {
				..._rawData[tokenAddress],
				rawPrice,
				normalizedPrice: toNormalizedValue(rawPrice, 6),
				normalizedValue: ((_rawData?.[tokenAddress] || 0).normalized * toNormalizedValue(rawPrice, 6))
			};
		}
		return _rawData;
	}, [props?.prices]);

	useEffect((): void => {
		onUpdate();
	}, [onUpdate]);

	const	contextValue = useMemo((): TUseBalancesRes => ({
		data: assignPrices(balances),
		nonce,
		update: onUpdate,
		updateSome: onUpdateSome,
		error,
		isLoading: status.isLoading,
		isFetching: status.isFetching,
		isSuccess: status.isSuccess,
		isError: status.isError,
		isFetched: status.isFetched,
		isRefetching: status.isRefetching,
		status: (
			status.isError ? 'error' :
				(status.isLoading || status.isFetching) ? 'loading' :
					(status.isSuccess) ? 'success' : 'unknown'
		)
	}), [assignPrices, balances, error, nonce, onUpdate, onUpdateSome, status.isError, status.isFetched, status.isFetching, status.isLoading, status.isRefetching, status.isSuccess]);

	return (contextValue);
}
