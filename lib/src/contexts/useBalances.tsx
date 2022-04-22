import	React, {createContext, ReactElement}	from	'react';
import	{Contract}								from	'ethcall';
import	{ethers}								from	'ethers';
import	useWeb3									from	'./useWeb3';
import	useLocalStorage							from	'../hooks/useLocalStorage';
import	{units as formatUnits}					from	'../utils/format';
import	{newEthCallProvider}					from	'../utils/providers';
import type * as useBalanceTypes				from	'./useBalances.d';

const	ERC20ABI = [
	{'constant':true, 'inputs':[{'name':'_owner', 'type':'address'}], 'name':'balanceOf', 'outputs':[{'name':'balance', 'type':'uint256'}], 'payable':false, 'stateMutability':'view', 'type':'function'}
];

const	BalancesContext = createContext<useBalanceTypes.TBalancesContext>({
	balancesOf: {},
	retrieveBalances: () => null
});
export const BalancesContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const	{isActive, provider, chainID, address, isDisconnected} = useWeb3();
	const	[balancesOf, set_balancesOf] = useLocalStorage('balances', {}) as [useBalanceTypes.TBalanceElement, (balancesOf: useBalanceTypes.TBalanceElement) => void];

	/* 💙 - Yearn Finance *************************************************************************
	**	On disconnect, clear balances.
	**********************************************************************************************/
	React.useEffect((): void => {
		if (isDisconnected)
			set_balancesOf({});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDisconnected]);

	/* 💙 - Yearn Finance *************************************************************************
	**	For every tokens in env, we need to retrieve the balance of tokens in the user's wallet to
	**	be able to use it in the dAPP
	**********************************************************************************************/
	const retrieveBalances = React.useCallback(async (tokensForChain: useBalanceTypes.TListTokens[]): Promise<void> => {
		const	_balancesOf = balancesOf;
		if (isActive && address && provider && tokensForChain?.length > 0) {
			const	ethcallProvider = await newEthCallProvider(provider);
			const	multiCalls = [];
			for (const token of tokensForChain) {
				const	contract = new Contract(token[0], ERC20ABI);
				multiCalls.push(contract.balanceOf(address));
			}

			const	callResult: (ethers.BigNumber | null)[] = await ethcallProvider.tryAll(multiCalls);
			let	rIndex = 0;
			for (const token of tokensForChain) {
				const value = callResult[rIndex++];
				_balancesOf[token[0]] = formatUnits(value || 0, token[1] || 18);
			}
			set_balancesOf(_balancesOf);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActive, address, chainID, provider]);

	React.useEffect((): void => {
		retrieveBalances((process.env.TOKENS as unknown as useBalanceTypes.TListTokens[]).filter((t): boolean => t[2] === chainID));
	}, [retrieveBalances]);

	return (
		<BalancesContext.Provider
			value={{
				balancesOf,
				retrieveBalances,
			}}>
			{children}
		</BalancesContext.Provider>
	);
};

export const useBalance = (): useBalanceTypes.TBalancesContext => React.useContext(BalancesContext);
export default useBalance;
