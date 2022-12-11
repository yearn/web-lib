import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Contract} from 'ethcall';
import {ethers} from 'ethers';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import ERC20_ABI from '@yearn-finance/web-lib/utils/abi/erc20.abi';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {ETH_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS} from '@yearn-finance/web-lib/utils/constants';
import * as format from '@yearn-finance/web-lib/utils/format';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import * as providers from '@yearn-finance/web-lib/utils/web3/providers';

import type {BigNumber} from 'ethers';
import type {TBalanceData, TDefaultStatus, TUseBalancesReq, TUseBalancesRes} from '@yearn-finance/web-lib/hooks/types';
import type {TDict} from '@yearn-finance/web-lib/utils/types';

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
	const	[rawData, set_rawData] = useState<TDict<TBalanceData>>({});
	const	[data, set_data] = useState<TDict<TBalanceData>>({});
	const	[status, set_status] = useState<TDefaultStatus>(defaultStatus);
	const	[error, set_error] = useState<Error | undefined>(undefined);
	const	interval = useRef<NodeJS.Timer>();
	const	effectDependencies = props?.effectDependencies || [];

	/* 🔵 - Yearn Finance ******************************************************
	** When this hook is called, it will fetch the informations for the
	** specified list of tokens. If no props are specified, the default values
	** will be used.
	**************************************************************************/
	const stringifiedTokens = useMemo((): string => JSON.stringify(props?.tokens || []), [props?.tokens]);

	const getBalances = useCallback(async (): Promise<TDict<TBalanceData>> => {
		const	tokens = JSON.parse(stringifiedTokens) || [];
		if (!isActive || !web3Address || tokens.length === 0) {
			return {};
		}
		set_status({
			...defaultStatus,
			isLoading: true,
			isFetching: true,
			isRefetching: defaultStatus.isFetched
		});

		let		currentProvider = providers.getProvider(props?.chainID || web3ChainID || 1);
		if (props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.BaseProvider | ethers.providers.Web3Provider;
		}

		const	calls = [];
		const	ethcallProvider = await providers.newEthCallProvider(currentProvider);
		for (const element of tokens) {
			const	{token} = element;
			const	ownerAddress = (element?.for || web3Address) as string;
			const	isEth = toAddress(token) === ETH_TOKEN_ADDRESS;
			if (isEth) {
				const	tokenContract = new Contract(WETH_TOKEN_ADDRESS, ERC20_ABI);
				calls.push(
					ethcallProvider.getEthBalance(ownerAddress),
					tokenContract.decimals(),
					tokenContract.symbol()
				);
			} else {
				const	tokenContract = new Contract(token, ERC20_ABI);
				calls.push(
					tokenContract.balanceOf(ownerAddress),
					tokenContract.decimals(),
					tokenContract.symbol()
				);
			}
		}

		const	_data: TDict<TBalanceData> = {};
		try {
			const	results = await ethcallProvider.tryAll(calls);
			let		rIndex = 0;
			for (const element of tokens) {
				const	{token} = element;
				const	balanceOf = results[rIndex++] as BigNumber;
				const	decimals = results[rIndex++] as number;
				const	rawPrice = format.BN(props?.prices?.[toAddress(token)] || ethers.constants.Zero);
				let symbol = results[rIndex++] as string;

				if (toAddress(token) === ETH_TOKEN_ADDRESS) {
					symbol = 'ETH';
				}
				_data[toAddress(token)] = {
					decimals: Number(decimals),
					symbol: symbol,
					raw: balanceOf,
					rawPrice,
					normalized: format.toNormalizedValue(balanceOf, Number(decimals)),
					normalizedPrice: format.toNormalizedValue(rawPrice, 6),
					normalizedValue: (format.toNormalizedValue(balanceOf, Number(decimals)) * format.toNormalizedValue(rawPrice, 6))
				};
			}
			set_error(undefined);
			return _data;
		} catch (_error) {
			set_error(_error as Error);
			return {};
		}
	}, [isActive, web3Address, props?.chainID, props?.prices, web3ChainID, provider, stringifiedTokens, ...effectDependencies]);

	useEffect((): VoidFunction => {
		let isActive = true;
		const executeGetBalances = async (): Promise<void> => {
			const	rawData = await getBalances();
			if (isActive) {
				performBatchedUpdates((): void => {
					set_rawData(rawData);
					set_status({...defaultStatus, isSuccess: true, isFetched: true});
				});
			}
		};
		executeGetBalances();
		return (): void => {
			isActive = false;
		};
	}, [getBalances]);


	/* 🔵 - Yearn Finance ******************************************************
	** Once the prices are available, we can update each balance with the price
	** information.
	**************************************************************************/
	const updatePriceInformation = useCallback(async (): Promise<void> => {
		const _data = {...rawData};
		for (const key of Object.keys(rawData)) {
			const	tokenAddress = toAddress(key);
			const	rawPrice = format.BN(props?.prices?.[tokenAddress] || ethers.constants.Zero);
			_data[tokenAddress] = {
				..._data[tokenAddress],
				rawPrice,
				normalizedPrice: format.toNormalizedValue(rawPrice, 6),
				normalizedValue: (_data[tokenAddress].normalized * format.toNormalizedValue(rawPrice, 6))
			};
		}
		set_data(_data);
	}, [rawData, props?.prices]);

	useEffect((): void => {
		updatePriceInformation();
	}, [updatePriceInformation]);

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
				getBalances();
			}, delay as number);
			return (): void => clearInterval(interval.current);
		}
		return (): void => undefined;
	}, [getBalances, props?.refreshEvery]);

	/* 🔵 - Yearn Finance ******************************************************
	** Add an interval to update the balance every X block, based on the
	** refreshEvery prop. This specific effect is not used if the refresh is 
	** not set or if it is NOT set to 'block'.
	**************************************************************************/
	useEffect((): () => void => {
		if (!props?.refreshEvery || props?.refreshEvery !== 'block') {
			return (): void => undefined;
		}

		let	currentProvider = props?.provider || providers.getProvider(props?.chainID || web3ChainID || 1);
		if (!props?.provider && props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.BaseProvider | ethers.providers.Web3Provider;
		}
		currentProvider.on('block', async (): Promise<TDict<TBalanceData>> => getBalances());

		return (): void => {
			currentProvider.off('block', async (): Promise<TDict<TBalanceData>> => getBalances());
		};
	}, [provider, props?.chainID, props?.provider, props?.refreshEvery, web3ChainID, getBalances]);

	return ({
		data,
		update: async (): Promise<TDict<TBalanceData>> => {
			const	rawData = await getBalances();
			performBatchedUpdates((): void => {
				set_rawData(rawData);
				set_status({...defaultStatus, isSuccess: true, isFetched: true});
			});
			return rawData;
		},
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
	});
}
