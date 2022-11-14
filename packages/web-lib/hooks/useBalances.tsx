import {useCallback, useEffect, useRef, useState} from 'react';
import {Contract} from 'ethcall';
import {BigNumber, ethers} from 'ethers';
import {useSettings} from '@yearn-finance/web-lib/contexts/useSettings';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import ERC20_ABI from '@yearn-finance/web-lib/utils/abi/erc20.abi';
import {ETH_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS} from '@yearn-finance/web-lib/utils/constants';
import * as format from '@yearn-finance/web-lib/utils/format';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import * as providers from '@yearn-finance/web-lib/utils/providers';
import {toAddress} from '@yearn-finance/web-lib/utils/utils';

import type * as Types from './types.d';

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
function	useBalances(props?: Types.TUseBalancesReq): Types.TUseBalancesRes {
	const	{networks} = useSettings();
	const	{address: web3Address, chainID: web3ChainID, isActive, provider} = useWeb3();
	const	[rawData, set_rawData] = useState<{[key: string]: Types.TBalanceData}>({});
	const	[data, set_data] = useState<{[key: string]: Types.TBalanceData}>({});
	const	[status, set_status] = useState<Types.TDefaultStatus>(defaultStatus);
	const	[error, set_error] = useState<Error | undefined>(undefined);
	const	interval = useRef<NodeJS.Timer>();
	const	effectDependencies = props?.effectDependencies || [];

	/* 🔵 - Yearn Finance ******************************************************
	** When this hook is called, it will fetch the informations for the
	** specified list of tokens. If no props are specified, the default values
	** will be used.
	**************************************************************************/
	const getBalances = useCallback(async (): Promise<void> => {
		if (!isActive || !web3Address || (props?.tokens || []).length === 0) {
			return;
		}

		set_status({
			...defaultStatus,
			isLoading: true,
			isFetching: true,
			isRefetching: defaultStatus.isFetched ? true : false
		});

		let		currentProvider = providers.getProvider(props?.chainID || web3ChainID || 1);
		if (props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.BaseProvider | ethers.providers.Web3Provider;
		}

		const	calls = [];
		const	ethcallProvider = await providers.newEthCallProvider(currentProvider);
		for (const element of (props?.tokens || [])) {
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

		const	_data: {[key: string]: Types.TBalanceData} = {};
		try {
			const	results = await ethcallProvider.tryAll(calls);
			let		rIndex = 0;
			for (const element of (props?.tokens || [])) {
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
					rawPrice: rawPrice,
					normalized: format.toNormalizedValue(balanceOf, Number(decimals)),
					normalizedPrice: format.toNormalizedValue(rawPrice, 6),
					normalizedValue: (format.toNormalizedValue(balanceOf, Number(decimals)) * format.toNormalizedValue(rawPrice, 6))
				};
			}
			performBatchedUpdates((): void => {
				set_rawData(_data);
				set_error(undefined);
				set_status({...defaultStatus, isSuccess: true, isFetched: true});
			});
		} catch (_error) {
			performBatchedUpdates((): void => {
				set_rawData({});
				set_error(_error as Error);
				set_status({...defaultStatus, isError: true, isFetched: true});
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActive, web3Address, props?.chainID, web3ChainID, provider, networks, props?.key, ...effectDependencies]);
	useEffect((): void => {
		getBalances();
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
				rawPrice: rawPrice,
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
		currentProvider.on('block', async (): Promise<void> => getBalances());

		return (): void => {
			currentProvider.off('block', async (): Promise<void> => getBalances());
		};
	}, [provider, props?.chainID, props?.provider, props?.refreshEvery, web3ChainID, getBalances]);

	return ({
		data,
		update: getBalances,
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

export default useBalances;
