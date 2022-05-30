import	React, {createContext, ReactElement, ErrorInfo}	from	'react';
import	{useWeb3React}							from	'@web3-react/core';
import	{InjectedConnector}						from	'@web3-react/injected-connector';
import	{WalletConnectConnector}				from	'@web3-react/walletconnect-connector';
import	{ModalLogin}							from	'../components/ModalLogin';
import	{useLocalStorage}						from	'../hooks/useLocalStorage';
import	{useWindowInFocus}						from	'../hooks/useWindowInFocus';
import	{useClientEffect}						from	'../hooks/useClientEffect';
import	{useDebounce}							from	'../hooks/useDebounce';
import	performBatchedUpdates					from	'../utils/performBatchedUpdates';
import	{getProvider}							from	'../utils/providers';
import	{toAddress}								from	'../utils/utils';
import	CHAINS									from	'../utils/chains';
import type * as useWeb3Types					from	'./useWeb3.d';

// eslint-disable-next-line @typescript-eslint/naming-convention
const walletType = {NONE: -1, METAMASK: 0, WALLET_CONNECT: 1, TRUSTWALLET: 2, COINBASE: 3, FORTMATIC: 4, PORTIS: 5};

const defaultState = {
	address: undefined,
	ens: undefined,
	chainID: 0,
	isDisconnected: false,
	isActive: false,
	hasProvider: false,
	provider: getProvider(),
	onConnect: (): void => undefined,
	onSwitchChain: (): void => undefined,
	openLoginModal: (): void => undefined,
	onDesactivate: (): void => undefined
};
const	defaultOptions: useWeb3Types.TWeb3Options = {
	shouldUseStrictChainMode: false,
	defaultChainID: 1,
	supportedChainID: [1, 4, 56, 100, 137, 250, 1337, 31337, 42161]
}

const Web3Context = createContext<useWeb3Types.TWeb3Context>(defaultState);
export const Web3ContextApp = ({children, options = defaultOptions}: {
	children: ReactElement,
	options?: useWeb3Types.TWeb3Options
}): ReactElement => {
	const	web3 = useWeb3React();
	const   {activate, active: isActive, library, account, chainId, deactivate} = web3;
	const   [ens, set_ens] = useLocalStorage('ens', '') as [string, (s: string) => void];
	const   [lastWallet, set_lastWallet] = useLocalStorage('lastWallet', walletType.NONE) as [number, (n: number) => void];
	const   [isDisconnected, set_isDisconnected] = React.useState(false);
	const	[hasDisableAutoChainChange, set_hasDisableAutoChainChange] = React.useState(false);
	const	[isModalLoginOpen, set_isModalLoginOpen] = React.useState(false);
	const	[chainID, set_chainID] = useLocalStorage('chainId', chainId) as [number, (n: number) => void];
	const	debouncedChainID = useDebounce(chainId, 500);
	const	hasWindowInFocus = useWindowInFocus();

	const onSwitchChain = React.useCallback((newChainID: number, force?: boolean): void => {
		if (newChainID === debouncedChainID) {
			return;
		}
		if (!force && (!isActive || hasDisableAutoChainChange)) {
			return;
		}
		const	isCompatibleChain = (options.supportedChainID).includes(Number(newChainID || 0))
		if (!force && !isCompatibleChain) {
			return;
		}
		if (!library || !isActive) {
			set_chainID(newChainID);
			return;
		}
		if (process.env.USE_WALLET) {
			if (Number(newChainID) === 1) {
				library
					.send('wallet_switchEthereumChain', [{chainId: '0x1'}])
					.catch((): void => set_hasDisableAutoChainChange(true));
			} else if (Number(newChainID) === 4) {
				library
					.send('wallet_switchEthereumChain', [{chainId: '0x4'}])
					.catch((): void => set_hasDisableAutoChainChange(true));
			} else {
				if (newChainID in CHAINS) {
					const chainSwap = CHAINS[newChainID as keyof typeof CHAINS].chain_swap;
					library
						.send('wallet_addEthereumChain', [chainSwap, account])
						.catch((error: ErrorInfo): void => console.error(error));
				}
			}
		}
	}, [debouncedChainID, isActive, hasDisableAutoChainChange, library, account]);

	React.useEffect((): void => onSwitchChain(options.defaultChainID), [hasWindowInFocus, onSwitchChain]);

	/**************************************************************************
	**	connect
	**	What should we do when the user choose to connect it's wallet ?
	**	Based on the providerType (AKA Metamask or WalletConnect), differents
	**	actions should be done.
	**	Then, depending on the providerType, a similar action, but different
	**	code is executed to set :
	**	- The provider for the web3 actions
	**	- The current address/account
	**	- The current chain
	**	Moreover, we are starting to listen to events (disconnect, changeAccount
	**	or changeChain).
	**************************************************************************/
	const connect = React.useCallback(async (
		_providerType: number,
		onError?: ((error: Error) => void) | undefined,
		onSuccess?: (() => void) | undefined
	): Promise<void> => {
		if (!process.env.USE_WALLET) {
			return;
		}
		if (_providerType === walletType.METAMASK) {
			if (isActive) {
				deactivate();
			}
			if (options.shouldUseStrictChainMode) {
				const	injected = new InjectedConnector({supportedChainIds: options.supportedChainID});
				try {
					await activate(injected, onError, true);					
					set_lastWallet(walletType.METAMASK);
					if (onSuccess)
						onSuccess()
				} catch (error) {
					set_lastWallet(walletType.NONE);
					if (onError)
						onError(error as Error);
				}
			} else {
				const	injected = new InjectedConnector({});
				try {
					await activate(injected, onError, true);					
					set_lastWallet(walletType.METAMASK);
					if (onSuccess)
						onSuccess()
				} catch (error) {
					set_lastWallet(walletType.NONE);
					if (onError)
						onError(error as Error);
				}
			}
		} else if (_providerType === walletType.WALLET_CONNECT) {
			if (isActive) {
				deactivate();
			}
			const walletconnect = new WalletConnectConnector({
				rpc: {
					1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
					4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
					250: 'https://rpc.ftm.tools',
					1337: 'http://localhost:8545',
					31337: 'http://localhost:8545'
				},
				chainId: 1,
				bridge: 'https://bridge.walletconnect.org'
			});
			try {
				await activate(walletconnect, onError, true);					
				set_lastWallet(walletType.WALLET_CONNECT);
				if (onSuccess)
					onSuccess()
			} catch (error) {
				set_lastWallet(walletType.NONE);
				if (onError)
					onError(error as Error);
			}
		}
	}, [activate, isActive, deactivate, set_lastWallet]);

	useClientEffect((): void => {
		if (!isActive && lastWallet !== walletType.NONE) {
			connect(lastWallet);
		}
	}, [isActive]);

	useClientEffect((): void => {
		if (account) {
			getProvider()
				.lookupAddress(toAddress(account))
				.then((_ens): void => set_ens(_ens || ''));
		}
	}, [account]);

	useClientEffect((): void => {
		if ((chainId || 0) > 0)
			set_chainID(Number(chainId))
	}, [chainId]);

	return (
		<Web3Context.Provider
			value={{
				address: account,
				ens,
				isDisconnected,
				chainID: Number(chainID || 0),
				onSwitchChain,
				isActive: isActive && (options.supportedChainID).includes(Number(chainId || 0)),
				hasProvider: !!library,
				provider: library,
				onConnect: (p: number, e?: ((error: Error) => void) | undefined, s?: (() => void) | undefined) => connect(p, e, s),
				openLoginModal: (): void => set_isModalLoginOpen(true),
				onDesactivate: (): void => {
					performBatchedUpdates((): void => {
						deactivate();
						set_lastWallet(walletType.NONE);
						set_isDisconnected(true);
					});
					setTimeout((): void => set_isDisconnected(false), 100);
				}
			}}>
			{children}
			<ModalLogin
				walletType={walletType}
				isOpen={isModalLoginOpen}
				onClose={(): void => set_isModalLoginOpen(false)} />
		</Web3Context.Provider>
	);
};

export const useWeb3 = (): useWeb3Types.TWeb3Context => React.useContext(Web3Context);
export default useWeb3;
