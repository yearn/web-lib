import	React, {createContext, ReactElement, ErrorInfo}	from	'react';
import	{useWeb3React}							from	'@web3-react/core';
import	{ethers}								from	'ethers';
import	{ModalLogin}							from	'../components/ModalLogin';
import	{useLocalStorage}						from	'../hooks/useLocalStorage';
import	{useWindowInFocus}						from	'../hooks/useWindowInFocus';
import	{useClientEffect}						from	'../hooks/useClientEffect';
import	{useDebounce}							from	'../hooks/useDebounce';
import	performBatchedUpdates					from	'../utils/performBatchedUpdates';
import	{getProvider}							from	'../utils/providers';
import	{toAddress, isIframe}					from	'../utils/utils';
import	{getPartner}							from	'../utils/partners';
import	CHAINS									from	'../utils/chains';
import	{connectors}							from	'../utils/connectors';
import	{IFrameEthereumProvider}				from	'../utils/connectors.eip1193.ledger';
import	type {TPartnersInfo}					from	'../utils/partners';
import	type * as useWeb3Types					from	'./useWeb3.d';

// eslint-disable-next-line @typescript-eslint/naming-convention
const walletType = {NONE: -1, METAMASK: 0, WALLET_CONNECT: 1, EMBED_LEDGER: 2, EMBED_GNOSIS_SAFE: 3, COINBASE: 4};

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
	const   {connector, isActive, provider, account, chainId} = web3;
	const   [ens, set_ens] = useLocalStorage('ens', '') as [string, (s: string) => void];
	const   [lastWallet, set_lastWallet] = useLocalStorage('lastWallet', walletType.NONE) as [number, (n: number) => void];
	const   [isDisconnected, set_isDisconnected] = React.useState(false);
	const	[hasDisableAutoChainChange, set_hasDisableAutoChainChange] = React.useState(false);
	const	[isModalLoginOpen, set_isModalLoginOpen] = React.useState(false);
	const	[chainID, set_chainID] = useLocalStorage('chainId', chainId) as [number, (n: number) => void];
	const	[_currentPartner, set_currentPartner] = React.useState<TPartnersInfo>();
	const	debouncedChainID = useDebounce(chainId, 500);
	const	hasWindowInFocus = useWindowInFocus();

	const	onSwitchChain = React.useCallback((newChainID: number, force?: boolean): void => {
		if (newChainID === debouncedChainID) {
			return;
		}
		if (!force && (!isActive || hasDisableAutoChainChange)) {
			return;
		}
		const	isCompatibleChain = (options.supportedChainID).includes(Number(newChainID || 0))
		if (!force && isCompatibleChain) {
			return;
		}
		if (!provider || !isActive) {
			set_chainID(newChainID);
			return;
		}
		if (process.env.USE_WALLET) {
			if (Number(newChainID) === 1) {
				provider
					.send('wallet_switchEthereumChain', [{chainId: '0x1'}])
					.catch((): void => set_hasDisableAutoChainChange(true));
			} else if (Number(newChainID) === 4) {
				provider
					.send('wallet_switchEthereumChain', [{chainId: '0x4'}])
					.catch((): void => set_hasDisableAutoChainChange(true));
			} else {
				if (newChainID in CHAINS) {
					const chainSwap = CHAINS[newChainID as keyof typeof CHAINS].chain_swap;
					provider
						.send('wallet_addEthereumChain', [chainSwap, account])
						.catch((error: ErrorInfo): void => console.error(error));
				}
			}
		}
	}, [debouncedChainID, isActive, hasDisableAutoChainChange, provider, account]);
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
			if (isActive)
				connectors.metamask.connector.deactivate();
			try {
				connectors.metamask.connector.activate();
				set_lastWallet(walletType.METAMASK);	
				if (onSuccess)
					onSuccess()
			} catch (error) {
				set_lastWallet(walletType.NONE);
				if (onError)
					onError(error as Error);
			}
		} else if (_providerType === walletType.WALLET_CONNECT) {
			if (isActive)
				connectors.walletConnect.connector.deactivate();
			try {
				connectors.walletConnect.connector.activate(1);
				set_lastWallet(walletType.WALLET_CONNECT);	
				if (onSuccess)
					onSuccess()
			} catch (error) {
				set_lastWallet(walletType.NONE);
				if (onError)
					onError(error as Error);
			}
		} else if (_providerType === walletType.EMBED_LEDGER) {
			set_lastWallet(walletType.EMBED_LEDGER);
		} else if (_providerType === walletType.EMBED_GNOSIS_SAFE) {
			if (isActive)
				connectors.gnosisSafe.connector.deactivate();
			try {
				connectors.gnosisSafe.connector.activate();
				set_lastWallet(walletType.EMBED_GNOSIS_SAFE);
				if (onSuccess)
					onSuccess()
			} catch (error) {
				set_lastWallet(walletType.NONE);
				if (onError)
					onError(error as Error);
			}
		} else if (_providerType === walletType.COINBASE) {
			if (isActive)
				connectors.coinbase.connector.deactivate();
			try {
				connectors.coinbase.connector.activate(1);
				set_lastWallet(walletType.COINBASE);	
				if (onSuccess)
					onSuccess()
			} catch (error) {
				set_lastWallet(walletType.NONE);
				if (onError)
					onError(error as Error);
			}
		} 
	}, [isActive, set_lastWallet, connectors]);

	useClientEffect(() => {
		if (isIframe()) {
			const params = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams, prop) => searchParams.get(prop as string),
			});
			const	origin = (params as any).origin;
			const	partnerInformation = getPartner(origin);

			/* 🔵 - Yearn Finance **************************************************
			**	First, do we have a way to know that we are working with a known
			**	provider (aka Ledger for example).
			**	If we don't know the provider, we will suppose it's a Gnosis Safe
			**	and try to connect.
			**********************************************************************/
			if (partnerInformation.id !== ethers.constants.AddressZero) {
				const	frameProvider = new IFrameEthereumProvider({targetOrigin: partnerInformation.originURI}) as any;
				const	frameWeb3Provider = frameProvider;
				frameWeb3Provider.request = frameProvider.request;
				connectors.eip1193.connector.init(frameWeb3Provider)
				connectors.eip1193.connector.activate();
				set_currentPartner(partnerInformation);
				connect(partnerInformation.walletType);
			} else {
				try {
					connectors.gnosisSafe.connector.activate().then(() => {
						if (connectors.gnosisSafe.connector.provider) {
							const	web3Provider = new ethers.providers.Web3Provider(connectors.gnosisSafe.connector.provider);
							const	signer = web3Provider.getSigner()
							signer.getAddress().then((signerAddress: string): void => {
								set_currentPartner({
									id: signerAddress,
									walletType: walletType.EMBED_GNOSIS_SAFE,
								});
								set_lastWallet(walletType.EMBED_GNOSIS_SAFE);
							})
						}
					})
				} catch (error) {}
			}
		} else if ((window?.ethereum as any)?.isCoinbaseBrowser) {
			connectors.coinbase.connector.activate().then(() => {
				set_lastWallet(walletType.COINBASE)
			});
		}
	}, []);

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
				hasProvider: !!provider,
				provider: provider as ethers.providers.BaseProvider,
				onConnect: (p: number, e?: ((error: Error) => void) | undefined, s?: (() => void) | undefined) => connect(p, e, s),
				openLoginModal: (): void => set_isModalLoginOpen(true),
				onDesactivate: (): void => {
					performBatchedUpdates((): void => {
						connector.deactivate();
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
