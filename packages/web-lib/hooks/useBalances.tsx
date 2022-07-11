import	{useState, useRef, useEffect, useCallback}			from	'react';
import	{BigNumber, ethers}									from	'ethers';
import	{Contract}											from	'ethcall';
import	{useWeb3}											from	'../contexts/useWeb3';
import	{useSettings}										from	'../contexts/useSettings';
import	{toAddress}											from	'../utils/utils';
import	performBatchedUpdates								from	'../utils/performBatchedUpdates';
import	* as format											from	'../utils/format';
import	* as providers										from	'../utils/providers';
import	ERC20_ABI											from	'../utils/abi/erc20.abi';
import	LENS_ABI											from	'../utils/abi/lens.abi';
import	type * as Types										from	'./types.d';

const		defaultStatus = {
	isLoading: false,
	isFetching: false,
	isSuccess: false,
	isError: false,
	isFetched: false,
	isRefetching: false
};
const		defaultData = {
	[toAddress('')]: {
		decimals: 0,
		normalized: 0,
		symbol: '',
		raw: ethers.constants.Zero,
		rawPrice: ethers.constants.Zero,
		normalizedPrice: 0,
		normalizedValue: 0
	}
};

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to fetch balance information for any ERC20 tokens.
**************************************************************************/
function	useBalances(props?: Types.TUseBalancesReq): Types.TUseBalancesRes {
	const	{networks} = useSettings();
	const	{address: web3Address, chainID: web3ChainID, isActive, provider} = useWeb3();
	const	[data, set_data] = useState<{[key: string]: Types.TBalanceData}>(defaultData);
	const	[status, set_status] = useState<Types.TDefaultStatus>(defaultStatus);
	const	[error, set_error] = useState<Error | undefined>(undefined);
	const	interval = useRef<NodeJS.Timer>();
  
	/* 🔵 - Yearn Finance ******************************************************
	** When this hook is called, it will fetch the informations for the
	** specified list of tokens. If no props are specified, the default values
	** will be used.
	**************************************************************************/
	const getBalances = useCallback(async (): Promise<void> => {
		if (!isActive || !web3Address || (props?.tokens || []).length === 0) {
			return;
		}

		set_status({...defaultStatus, isLoading: true, isFetching: true, isRefetching: defaultStatus.isFetched ? true : false});
		let		currentProvider = providers.getProvider(props?.chainID || web3ChainID || 1);
		if (props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.BaseProvider | ethers.providers.Web3Provider;
		}

		const	lensAddress = networks[props?.chainID || web3ChainID].lensAddress;
		let		lensContract: Contract | undefined = undefined;
		if (lensAddress)
			lensContract = new Contract(lensAddress, LENS_ABI);

		const	calls = [];
		const	ethcallProvider = await providers.newEthCallProvider(currentProvider);
		for (const element of (props?.tokens || [])) {
			const	token = element.token as string;
			const	ownerAddress = (element?.for || web3Address) as string;
			const	tokenContract = new Contract(token, ERC20_ABI);

			calls.push(...[
				tokenContract.balanceOf(ownerAddress),
				tokenContract.decimals(),
				tokenContract.symbol(),
				lensContract ? lensContract.getPriceUsdcRecommended(token) : tokenContract.balanceOf(ownerAddress)
			]);
		}

		const	_data: {[key: string]: Types.TBalanceData} = {};
		try {
			const	results = await ethcallProvider.tryAll(calls);
			let		rIndex = 0;
			for (const element of (props?.tokens || [])) {
				const	token = element.token as string;
				const	balanceOf = results[rIndex++] as BigNumber;
				const	decimals = results[rIndex++] as number;
				const	symbol = results[rIndex++] as string;
				const	price = results[rIndex++] as BigNumber;
				_data[toAddress(token)] = {
					decimals: Number(decimals),
					symbol: symbol,
					raw: balanceOf,
					rawPrice: lensContract ? price : ethers.constants.Zero,
					normalized: format.toNormalizedValue(balanceOf, Number(decimals)),
					normalizedPrice: lensContract ? format.toNormalizedValue(price, 6) : 0,
					normalizedValue: lensContract ? (format.toNormalizedValue(balanceOf, Number(decimals)) * format.toNormalizedValue(price, 6)) : 0
				};
			}
			performBatchedUpdates((): void => {
				set_data(_data);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActive, web3Address, props?.chainID, web3ChainID, provider, networks, props?.key]);
	useEffect((): void => {
		getBalances();
	}, [getBalances]);

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
