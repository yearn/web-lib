import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {erc20ABI, useChainId} from 'wagmi';
import {deserialize, multicall, serialize} from '@wagmi/core';

import {useUI} from '../contexts/useUI.js';
import {useWeb3} from '../contexts/useWeb3.js';
import {AGGREGATE3_ABI} from '../utils/abi/aggregate.abi.js';
import {isZeroAddress, toAddress} from '../utils/address.js';
import {MULTICALL3_ADDRESS} from '../utils/constants.js';
import {decodeAsBigInt, decodeAsNumber, decodeAsString} from '../utils/decoder.js';
import {toBigInt, toNormalizedValue} from '../utils/format.bigNumber.js';
import {isEth} from '../utils/isEth.js';
import {isZero} from '../utils/isZero.js';
import {getNetwork} from '../utils/wagmi/utils.js';

import type {DependencyList} from 'react';
import type {ContractFunctionConfig} from 'viem';
import type {Connector} from 'wagmi';
import type {TBalanceData, TDefaultStatus} from '../types/hooks.js';
import type {TAddress, TDict, TNDict} from '../types/index.js';
import type {TYDaemonPrices} from '../utils/schemas/yDaemonPricesSchema.js';

/* 🔵 - Yearn Finance **********************************************************
 ** Request, Response and helpers for the useBalances hook.
 ******************************************************************************/
export type TUseBalancesTokens = {
	token: string;
	decimals?: number;
	name?: string;
	symbol?: string;
	for?: string;
};
export type TUseBalancesReq = {
	key?: string | number;
	tokens: TUseBalancesTokens[];
	prices?: TYDaemonPrices;
	effectDependencies?: DependencyList;
	provider?: Connector;
};

export type TUseBalancesRes = {
	data: TDict<TBalanceData>;
	update: () => Promise<TDict<TBalanceData>>;
	updateSome: (token: TUseBalancesTokens[]) => Promise<TDict<TBalanceData>>;
	error?: Error;
	status: 'error' | 'loading' | 'success' | 'unknown';
	nonce: number;
} & TDefaultStatus;

type TDataRef = {
	nonce: number;
	address: TAddress;
	balances: TDict<TBalanceData>;
};

/* 🔵 - Yearn Finance **********************************************************
 ** Default status for the loading state.
 ******************************************************************************/
const defaultStatus = {
	isLoading: false,
	isFetching: false,
	isSuccess: false,
	isError: false,
	isFetched: false,
	isRefetching: false
};

async function performCall(
	chainID: number,
	calls: ContractFunctionConfig[],
	tokens: TUseBalancesTokens[],
	prices?: TYDaemonPrices
): Promise<[TDict<TBalanceData>, Error | undefined]> {
	const _data: TDict<TBalanceData> = {};
	const results = await multicall({
		contracts: calls as never[],
		chainId: chainID
	});

	let rIndex = 0;
	for (const element of tokens) {
		const {token, decimals: injectedDecimals, name: injectedName, symbol: injectedSymbol} = element;
		const balanceOf = decodeAsBigInt(results[rIndex++]);
		const decimals = decodeAsNumber(results[rIndex++]) || injectedDecimals || 18;
		const rawPrice = toBigInt(prices?.[toAddress(token)]);
		let symbol = decodeAsString(results[rIndex++]) || injectedSymbol || '';
		let name = decodeAsString(results[rIndex++]) || injectedName || '';
		if (isEth(token)) {
			const nativeTokenWrapper = getNetwork(chainID)?.contracts?.wrappedToken;
			if (nativeTokenWrapper) {
				symbol = nativeTokenWrapper.coinSymbol;
				name = nativeTokenWrapper.coinName;
			}
		}

		_data[toAddress(token)] = {
			decimals: decimals,
			symbol: symbol,
			name: name,
			raw: balanceOf,
			rawPrice,
			normalized: toNormalizedValue(balanceOf, decimals),
			normalizedPrice: toNormalizedValue(rawPrice, 6),
			normalizedValue: toNormalizedValue(balanceOf, decimals) * toNormalizedValue(rawPrice, 6)
		};
	}
	return [_data, undefined];
}

async function getBalances(
	chainID: number,
	address: TAddress,
	tokens: TUseBalancesTokens[],
	prices?: TYDaemonPrices
): Promise<[TDict<TBalanceData>, Error | undefined]> {
	let result: TDict<TBalanceData> = {};
	const calls: ContractFunctionConfig[] = [];

	for (const element of tokens) {
		const {token} = element;
		const ownerAddress = address;
		if (isEth(token)) {
			const nativeTokenWrapper = getNetwork(chainID)?.contracts?.wrappedToken;
			if (!nativeTokenWrapper) {
				console.error('No native token wrapper found for chainID', chainID);
				continue;
			}
			const multicall3Contract = {
				address: MULTICALL3_ADDRESS,
				abi: AGGREGATE3_ABI
			};
			const baseContract = {
				address: nativeTokenWrapper.address,
				abi: erc20ABI
			};
			calls.push({
				...multicall3Contract,
				functionName: 'getEthBalance',
				args: [ownerAddress]
			});
			calls.push({...baseContract, functionName: 'decimals'});
			calls.push({...baseContract, functionName: 'symbol'});
			calls.push({...baseContract, functionName: 'name'});
		} else {
			const baseContract = {address: toAddress(token), abi: erc20ABI};
			calls.push({
				...baseContract,
				functionName: 'balanceOf',
				args: [ownerAddress]
			});
			calls.push({...baseContract, functionName: 'decimals'});
			calls.push({...baseContract, functionName: 'symbol'});
			calls.push({...baseContract, functionName: 'name'});
		}
	}

	try {
		const [callResult] = await performCall(chainID, calls, tokens, prices);
		result = {...result, ...callResult};
		return [result, undefined];
	} catch (_error) {
		console.error(_error);
		return [result, _error as Error];
	}
}

/* 🔵 - Yearn Finance ******************************************************
 ** This hook can be used to fetch balance information for any ERC20 tokens.
 **************************************************************************/
export function useBalances(props?: TUseBalancesReq): TUseBalancesRes {
	const {address: web3Address, isActive} = useWeb3();
	const chainID = useChainId();
	const {onLoadStart, onLoadDone} = useUI();
	const [nonce, set_nonce] = useState(0);
	const [status, set_status] = useState<TDefaultStatus>(defaultStatus);
	const [error, set_error] = useState<Error | undefined>(undefined);
	const [balances, set_balances] = useState<TNDict<TDict<TBalanceData>>>({});
	const data = useRef<TNDict<TDataRef>>({
		1: {nonce: 0, address: toAddress(), balances: {}}
	});
	const stringifiedTokens = useMemo((): string => serialize(props?.tokens || []), [props?.tokens]);

	const updateBalancesCall = useCallback(
		(chainID: number, newRawData: TDict<TBalanceData>): TDict<TBalanceData> => {
			if (toAddress(web3Address) !== data?.current?.[chainID]?.address) {
				data.current[chainID] = {
					address: toAddress(web3Address),
					balances: {},
					nonce: 0
				};
			}
			data.current[chainID].address = toAddress(web3Address);

			for (const [address, element] of Object.entries(newRawData)) {
				element.raw = element.raw || 0n;
				data.current[chainID].balances[address] = {
					...data.current[chainID].balances[address],
					...element
				};
			}
			data.current[chainID].nonce += 1;

			set_balances(
				(b): TNDict<TDict<TBalanceData>> => ({
					...b,
					[chainID]: {
						...(b[chainID] || {}),
						...data.current[chainID].balances
					}
				})
			);
			set_nonce((n): number => n + 1);
			return data.current[chainID].balances;
		},
		[web3Address]
	);

	/* 🔵 - Yearn Finance ******************************************************
	 ** onUpdate will take the stringified tokens and fetch the balances for each
	 ** token. It will then update the balances state with the new balances.
	 ** This takes the whole list and is not optimized for performance, aka not
	 ** send in a worker.
	 **************************************************************************/
	const onUpdate = useCallback(async (): Promise<TDict<TBalanceData>> => {
		if (!web3Address || !isActive) {
			return {};
		}
		const tokenList = deserialize(stringifiedTokens) || [];
		const tokens = tokenList.filter(({token}: TUseBalancesTokens): boolean => !isZeroAddress(token));
		if (isZero(tokens.length)) {
			return {};
		}
		set_status({
			...defaultStatus,
			isLoading: true,
			isFetching: true,
			isRefetching: defaultStatus.isFetched
		});
		onLoadStart();

		const chunks = [];
		for (let i = 0; i < tokens.length; i += 5_000) {
			chunks.push(tokens.slice(i, i + 5_000));
		}

		for (const chunkTokens of chunks) {
			const [newRawData, err] = await getBalances(chainID || 1, web3Address, chunkTokens);
			if (toAddress(web3Address as string) !== data?.current?.[chainID]?.address) {
				data.current[chainID] = {
					address: toAddress(web3Address as string),
					balances: {},
					nonce: 0
				};
			}
			data.current[chainID].address = toAddress(web3Address as string);

			for (const [address, element] of Object.entries(newRawData)) {
				data.current[chainID].balances[address] = {
					...data.current[chainID].balances[address],
					...element
				};
			}
			data.current[chainID].nonce += 1;

			set_balances(
				(b): TNDict<TDict<TBalanceData>> => ({
					...b,
					[chainID]: {
						...(b[chainID] || {}),
						...data.current[chainID].balances
					}
				})
			);
			set_nonce((n): number => n + 1);
			set_error(err as Error);
			set_status({
				...defaultStatus,
				isSuccess: true,
				isFetched: true
			});
		}
		onLoadDone();

		return data.current[chainID].balances;
	}, [onLoadDone, onLoadStart, isActive, stringifiedTokens, web3Address, chainID]);

	/* 🔵 - Yearn Finance ******************************************************
	 ** onUpdateSome takes a list of tokens and fetches the balances for each
	 ** token. Even if it's not optimized for performance, it should not be an
	 ** issue as it should only be used for a little list of tokens.
	 **************************************************************************/
	const onUpdateSome = useCallback(
		async (tokenList: TUseBalancesTokens[]): Promise<TDict<TBalanceData>> => {
			set_status({
				...defaultStatus,
				isLoading: true,
				isFetching: true,
				isRefetching: defaultStatus.isFetched
			});
			onLoadStart();
			const tokens = tokenList.filter(({token}: TUseBalancesTokens): boolean => !isZeroAddress(token));
			const chunks = [];
			for (let i = 0; i < tokens.length; i += 2_000) {
				chunks.push(tokens.slice(i, i + 2_000));
			}

			const tokensAdded: TDict<TBalanceData> = {};
			for (const chunkTokens of chunks) {
				const [newRawData, err] = await getBalances(
					chainID || 1,
					toAddress(web3Address as string),
					chunkTokens
				);
				if (toAddress(web3Address as string) !== data?.current?.[chainID]?.address) {
					data.current[chainID] = {
						address: toAddress(web3Address as string),
						balances: {},
						nonce: 0
					};
				}
				data.current[chainID].address = toAddress(web3Address as string);

				for (const [address, element] of Object.entries(newRawData)) {
					tokensAdded[address] = element;
					data.current[chainID].balances[address] = {
						...data.current[chainID].balances[address],
						...element
					};
				}
				data.current[chainID].nonce += 1;

				set_balances(
					(b): TNDict<TDict<TBalanceData>> => ({
						...b,
						[chainID]: {
							...(b[chainID] || {}),
							...data.current[chainID].balances
						}
					})
				);
				set_nonce((n): number => n + 1);
				set_error(err as Error);
				set_status({
					...defaultStatus,
					isSuccess: true,
					isFetched: true
				});
			}
			onLoadDone();
			return tokensAdded;
		},
		[onLoadDone, onLoadStart, web3Address, chainID]
	);

	const assignPrices = useCallback(
		(_rawData: TNDict<TDict<TBalanceData>>): TNDict<TDict<TBalanceData>> => {
			for (const chainIDStr of Object.keys(_rawData)) {
				const chainID = Number(chainIDStr);
				for (const address of Object.keys(_rawData[chainID])) {
					const tokenAddress = toAddress(address);
					const rawPrice = toBigInt(props?.prices?.[tokenAddress]);
					if (!_rawData[chainID]) {
						_rawData[chainID] = {};
					}
					_rawData[chainID][tokenAddress] = {
						..._rawData[chainID][tokenAddress],
						rawPrice,
						normalizedPrice: toNormalizedValue(rawPrice, 6),
						normalizedValue:
							(_rawData[chainID]?.[tokenAddress] || 0).normalized * toNormalizedValue(rawPrice, 6)
					};
				}
			}
			return _rawData;
		},
		[props?.prices]
	);

	const asyncUseEffect = useCallback(async (): Promise<void> => {
		if (!isActive || !web3Address) {
			return;
		}
		set_status({
			...defaultStatus,
			isLoading: true,
			isFetching: true,
			isRefetching: defaultStatus.isFetched
		});
		onLoadStart();

		const tokens = JSON.parse(stringifiedTokens) as TUseBalancesTokens[];
		const chunks = [];
		for (let i = 0; i < tokens.length; i += 100) {
			chunks.push(tokens.slice(i, i + 100));
		}
		const allPromises = [];
		for (const chunkTokens of chunks) {
			allPromises.push(
				getBalances(chainID || 1, web3Address, chunkTokens).then(async ([newRawData, err]): Promise<void> => {
					updateBalancesCall(chainID || 1, newRawData);
					set_error(err);
				})
			);
		}
		await Promise.all(allPromises);
		onLoadDone();
		set_status({...defaultStatus, isSuccess: true, isFetched: true});
	}, [stringifiedTokens, isActive, web3Address, chainID, updateBalancesCall, onLoadStart, onLoadDone]);

	const withPrice = useMemo(
		(): TDict<TBalanceData> => assignPrices(balances || {})?.[chainID] || {},
		[assignPrices, balances, chainID]
	);

	/* 🔵 - Yearn Finance ******************************************************
	 ** Everytime the stringifiedTokens change, we need to update the balances.
	 ** This is the main hook and is optimized for performance, using a worker
	 ** to fetch the balances, preventing the UI to freeze.
	 **************************************************************************/
	useEffect((): void => {
		asyncUseEffect();
	}, [asyncUseEffect]);

	const contextValue = useMemo(
		(): TUseBalancesRes => ({
			data: withPrice,
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
			status: status.isError
				? 'error'
				: status.isLoading || status.isFetching
					? 'loading'
					: status.isSuccess
						? 'success'
						: 'unknown'
		}),
		[
			error,
			nonce,
			onUpdate,
			onUpdateSome,
			status.isError,
			status.isFetched,
			status.isFetching,
			status.isLoading,
			status.isRefetching,
			status.isSuccess,
			withPrice
		]
	);

	return contextValue;
}
