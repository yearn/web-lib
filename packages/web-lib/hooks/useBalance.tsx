'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {Contract} from 'ethcall';
import {BigNumber, ethers} from 'ethers';
import {useSettings} from '@yearn-finance/web-lib/contexts/useSettings';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import ERC20_ABI from '@yearn-finance/web-lib/utils/abi/erc20.abi';
import LENS_ABI from '@yearn-finance/web-lib/utils/abi/lens.abi';
import * as format from '@yearn-finance/web-lib/utils/format';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import * as providers from '@yearn-finance/web-lib/utils/providers';
import {isZeroAddress, toAddress} from '@yearn-finance/web-lib/utils/utils';

import type * as Types from './types.d';

const		defaultStatus = {
	isLoading: false,
	isFetching: false,
	isSuccess: false,
	isError: false,
	isFetched: false,
	isRefetching: false
};
const		defaultData = {
	decimals: 0,
	normalized: 0,
	symbol: '',
	raw: ethers.constants.Zero,
	rawPrice: ethers.constants.Zero,
	normalizedPrice: 0,
	normalizedValue: 0
};

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to fetch balance information for the ETH coin or
** any ERC20 token.
**************************************************************************/
function	useBalance(props?: Types.TUseBalanceReq): Types.TUseBalanceRes {
	const	{networks} = useSettings();
	const	{address: web3Address, chainID: web3ChainID, isActive, provider} = useWeb3();
	const	[data, set_data] = useState<Types.TBalanceData>(defaultData);
	const	[status, set_status] = useState<Types.TDefaultStatus>(defaultStatus);
	const	[error, set_error] = useState<Error | undefined>(undefined);
	const	interval = useRef<NodeJS.Timer>();
  
	/* 🔵 - Yearn Finance ******************************************************
	** When this hook is called, it will fetch the balance for the specified
	** props. If no props are specified, the default values will be used.
	**************************************************************************/
	const getBalance = useCallback(async (): Promise<void> => {
		if (!isActive || (!props?.for && !web3Address)) {
			return;
		}

		set_status({...defaultStatus, isLoading: true, isFetching: true, isRefetching: defaultStatus.isFetched ? true : false});
		const	ownerAddress = (props?.for || web3Address) as string;
		let		currentProvider = providers.getProvider(props?.chainID || web3ChainID || 1);
		if (props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.BaseProvider | ethers.providers.Web3Provider;
		}

		const	{lensAddress} = networks[props?.chainID || web3ChainID];
		let		lensContract: Contract | undefined = undefined;
		if (lensAddress) {
			lensContract = new Contract(lensAddress, LENS_ABI);
		}

		//If no token provider or if provided token is Fake ETH, then fetch ETH Balance
		if (isZeroAddress(props?.token) || toAddress(props?.token) === toAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')) {
			try {
				const	[balanceOfEth, priceOfWEth] = await Promise.all([
					currentProvider.getBalance(ownerAddress),
					lensContract ? lensContract.getPriceUsdcRecommended('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2') : undefined
				]);
				performBatchedUpdates((): void => {
					set_data({
						decimals: 18,
						symbol: 'ETH',
						raw: balanceOfEth,
						rawPrice: priceOfWEth ? priceOfWEth : ethers.constants.Zero,
						normalized: format.toNormalizedValue(balanceOfEth, 18),
						normalizedPrice: priceOfWEth ? format.toNormalizedValue(priceOfWEth, 6) : 0,
						normalizedValue: priceOfWEth ? (format.toNormalizedValue(balanceOfEth, 18) * format.toNormalizedValue(priceOfWEth, 6)) : 0
					});
					set_error(undefined);
					set_status({...defaultStatus, isSuccess: true, isFetched: true});
				});
			} catch (_error) {
				performBatchedUpdates((): void => {
					set_data(defaultData);
					set_error(_error as Error);
					set_status({...defaultStatus, isError: true, isFetched: true});
				});
			}
			return;
		}

		const	token = props?.token as string;
		const	tokenContract = new Contract(token, ERC20_ABI);
		try {
			const	ethcallProvider = await providers.newEthCallProvider(currentProvider);
			const	multiCallResult = await ethcallProvider.tryAll([
				tokenContract.balanceOf(ownerAddress),
				tokenContract.decimals(),
				tokenContract.symbol(),
				lensContract ? lensContract.getPriceUsdcRecommended(token) : tokenContract.balanceOf(ownerAddress)
			]) as [BigNumber, number, string, BigNumber];

			const	[balanceOf, decimals, symbol, price] = multiCallResult;
			performBatchedUpdates((): void => {
				set_data({
					decimals: Number(decimals),
					symbol: symbol,
					raw: balanceOf,
					rawPrice: lensContract ? price : ethers.constants.Zero,
					normalized: format.toNormalizedValue(balanceOf, Number(decimals)),
					normalizedPrice: lensContract ? format.toNormalizedValue(price, 6) : 0,
					normalizedValue: lensContract ? (format.toNormalizedValue(balanceOf, Number(decimals)) * format.toNormalizedValue(price, 6)) : 0
				});
				set_error(undefined);
				set_status({...defaultStatus, isSuccess: true, isFetched: true});
			});
		} catch (_error) {
			performBatchedUpdates((): void => {
				set_data(defaultData);
				set_error(_error as Error);
				set_status({...defaultStatus, isError: true, isFetched: true});
			});
		}
	}, [props?.for, props?.chainID, isActive, provider, props?.token, web3Address, web3ChainID, networks]);
	useEffect((): void => {
		getBalance();
	}, [getBalance]);

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
				getBalance();
			}, delay as number);
			return (): void => clearInterval(interval.current);
		}
		return (): void => undefined;
	}, [getBalance, props?.refreshEvery]);

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
		currentProvider.on('block', async (): Promise<void> => getBalance());

		return (): void => {
			currentProvider.off('block', async (): Promise<void> => getBalance());
		};
	}, [provider, props?.chainID, props?.provider, props?.refreshEvery, web3ChainID, getBalance]);

	return ({
		data,
		update: getBalance,
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

export default useBalance;
