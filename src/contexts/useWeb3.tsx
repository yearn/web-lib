import	React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import assert from 'assert';
import {useAccount, useConnect, useDisconnect, useEnsName, useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig} from 'wagmi';
import {useIsMounted, useUpdateEffect} from '@react-hookz/web';
import {EthereumClient} from '@web3modal/ethereum';
import {Web3Modal} from '@web3modal/react';

import {ModalLogin} from '../components/ModalLogin.js';
import {toAddress} from '../utils/address.js';
import {isIframe} from '../utils/helpers.js';
import {getConfig, getSupportedProviders} from '../utils/wagmi/config.js';
import {configureChains} from '../utils/wagmi/configChain.tmp.js';
import {deepMerge} from './utils.js';

import type {ReactElement} from 'react';
import type {BaseError, FallbackTransport} from 'viem';
import type {Config, PublicClient, WebSocketPublicClient} from 'wagmi';
import type {Chain, ConnectResult} from '@wagmi/core';
import type {TWeb3Context, TWeb3Options} from '../types/contexts.js';

const defaultState = {
	address: undefined,
	ens: undefined,
	lensProtocolHandle: undefined,
	chainID: 1,
	isDisconnected: false,
	isActive: false,
	isConnecting: false,
	isWalletSafe: false,
	isWalletLedger: false,
	hasProvider: false,
	provider: undefined,
	currentPartner: undefined,
	walletType: 'NONE',
	onConnect: async (): Promise<void> => undefined,
	onSwitchChain: (): void => undefined,
	openLoginModal: (): void => undefined,
	onDesactivate: (): void => undefined
};
const defaultOptions = {
	shouldUseWallets: true,
	defaultChainID: 1
};

const Web3Context = createContext<TWeb3Context>(defaultState);
export const Web3ContextAppWrapper = ({children, options}: {children: ReactElement, options?: TWeb3Options}): ReactElement => {
	const {address, isConnecting, isConnected, isDisconnected, connector} = useAccount();
	const {connectAsync, connectors} = useConnect();
	const {disconnect} = useDisconnect();
	const {switchNetwork} = useSwitchNetwork();
	const {data: ensName} = useEnsName({address: address, chainId: 1});
	const {data: walletClient} = useWalletClient();
	const {chain} = useNetwork();
	const [currentChainID, set_currentChainID] = useState(chain?.id);
	const publicClient = usePublicClient();
	const isMounted = useIsMounted();
	const web3Options = deepMerge(defaultOptions, options) as TWeb3Options;
	const [isModalLoginOpen, set_isModalLoginOpen] = useState(false);

	const supportedChainsID = useMemo((): number[] => {
		const injectedConnector = connectors.find((e): boolean => (e.id).toLocaleLowerCase() === 'injected');
		assert(injectedConnector, 'No injected connector found');
		const chainsForInjected = injectedConnector.chains;
		const noTestnet = chainsForInjected.filter(({id}): boolean => id !== 1337);
		return noTestnet.map((network: Chain): number => network.id);
	}, [connectors]);

	useUpdateEffect((): void => {
		set_currentChainID(chain?.id);
	}, [chain]);

	const onConnect = useCallback(async (
		providerType: string,
		onError?: ((error: Error) => void) | undefined,
		onSuccess?: (() => void) | undefined
	): Promise<void> => {
		try {
			const ledgerConnector = connectors.find((c): boolean => c.id === 'ledgerLive');
			const safeConnector = connectors.find((c): boolean => c.id === 'safe');
			const injectedConnector = connectors.find((c): boolean => (c.id).toLocaleLowerCase() === 'injected');
			const ledgerInjectedConnector = connectors.find((c): boolean => c.id === 'ledger');
			const walletConnectConnector = connectors.find((c): boolean => c.id === 'walletConnect');
			const coinbaseWalletConnector = connectors.find((c): boolean => c.id === 'coinbaseWallet');

			if (isIframe() && (safeConnector || ledgerConnector)) {
				let r: ConnectResult | undefined = undefined;
				if (safeConnector && ledgerConnector) {
					r = await Promise.race([
						connectAsync({connector: safeConnector, chainId: currentChainID}),
						connectAsync({connector: ledgerConnector, chainId: currentChainID})
					]);
				} else if (safeConnector) {
					r = await connectAsync({connector: safeConnector, chainId: currentChainID});
				} else if (ledgerConnector) {
					r = await connectAsync({connector: ledgerConnector, chainId: currentChainID});
				}
				if (r?.account) {
					return onSuccess?.();
				}
				return;
			}

			if (providerType === 'INJECTED' && injectedConnector) {
				await connectAsync({connector: injectedConnector, chainId: currentChainID});
			} else if (providerType === 'INJECTED_LEDGER' && ledgerInjectedConnector) {
				await connectAsync({connector: ledgerInjectedConnector, chainId: currentChainID});
			} else if (providerType === 'WALLET_CONNECT' && walletConnectConnector) {
				await connectAsync({connector: walletConnectConnector, chainId: currentChainID});
			} else if (providerType === 'EMBED_LEDGER' && ledgerConnector) {
				await connectAsync({connector: ledgerConnector, chainId: currentChainID});
			} else if (providerType === 'EMBED_GNOSIS_SAFE' && safeConnector) {
				await connectAsync({connector: safeConnector, chainId: currentChainID});
			} else if (providerType === 'EMBED_COINBASE' && coinbaseWalletConnector) {
				await connectAsync({connector: coinbaseWalletConnector, chainId: currentChainID});
			} else if (providerType === 'EMBED_TRUSTWALLET' && injectedConnector) {
				await connectAsync({connector: injectedConnector, chainId: currentChainID});
			} else {
				await connectAsync({connector: injectedConnector, chainId: currentChainID});
			}
			onSuccess?.();
		} catch (error) {
			if ((error as BaseError).name === 'ConnectorAlreadyConnectedError') {
				return onSuccess?.();
			}
			onError?.(error as unknown as Error);
		}
	}, [connectAsync, connectors, currentChainID]);

	const onDesactivate = useCallback((): void => {
		disconnect();
	}, [disconnect]);

	const	onSwitchChain = useCallback((newChainID: number): void => {
		set_currentChainID(newChainID);
		if (isConnected) {
			if (!switchNetwork) {
				console.error(new Error('Switch network function is not defined'));
			}
			switchNetwork?.(newChainID);
		}
	}, [switchNetwork, isConnected]);

	const walletType = useMemo((): string => {
		if (!connector) {
			return ('NONE');
		}
		switch (connector.id) {
			case 'safe':
				return ('EMBED_GNOSIS_SAFE');
			case 'ledger':
				return ('EMBED_LEDGER');
			case 'walletConnectLegacy':
				return ('WALLET_CONNECT');
			case 'walletConnect':
				return ('WALLET_CONNECT');
			case 'coinbaseWallet':
				return ('EMBED_COINBASE');
			default:
				return ('INJECTED');
		}
	}, [connector]);

	const openLoginModal = useCallback(async (): Promise<void> => {
		const ledgerConnector = connectors.find((c): boolean => c.id === 'ledgerLive');
		const safeConnector = connectors.find((c): boolean => c.id === 'safe');

		if (isIframe() && (safeConnector || ledgerConnector)) {
			let r: ConnectResult | undefined = undefined;
			if (safeConnector && ledgerConnector) {
				r = await Promise.race([
					connectAsync({connector: safeConnector, chainId: currentChainID}),
					connectAsync({connector: ledgerConnector, chainId: currentChainID})
				]);
			} else if (safeConnector) {
				r = await connectAsync({connector: safeConnector, chainId: currentChainID});
			} else if (ledgerConnector) {
				r = await connectAsync({connector: ledgerConnector, chainId: currentChainID});
			}
			if (r?.account) {
				return;
			}
		}
		set_isModalLoginOpen(true);
	}, [connectAsync, connectors, currentChainID]);

	const contextValue = {
		address: address ? toAddress(address) : undefined,
		isConnecting,
		isDisconnected,
		ens: ensName || '',
		isActive: isConnected && [...supportedChainsID, 1337].includes(chain?.id || -1) && isMounted(),
		isWalletSafe: connector?.id === 'safe' || (connector as any)?._wallets?.[0]?.id === 'safe',
		isWalletLedger: connector?.id === 'ledger' || (connector as any)?._wallets?.[0]?.id === 'ledger',
		lensProtocolHandle: '',
		hasProvider: !!(walletClient || publicClient),
		provider: connector,
		chainID: isConnected ? Number(chain?.id || 1) : Number(currentChainID || 1),
		onConnect,
		onSwitchChain,
		openLoginModal,
		onDesactivate: onDesactivate,
		options: web3Options,
		walletType: walletType
	};

	return (
		<Web3Context.Provider value={contextValue}>
			{children}
			<ModalLogin
				isOpen={isModalLoginOpen}
				onClose={(): void => set_isModalLoginOpen(false)} />
		</Web3Context.Provider>
	);
};

export const Web3ContextApp = ({children, supportedChains, options}: {
	children: ReactElement,
	supportedChains: Chain[],
	options?: TWeb3Options
}): ReactElement => {

	const config = useMemo((): Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>> => {
		const {chains, publicClient, webSocketPublicClient} = configureChains(
			supportedChains,
			getSupportedProviders()
		);
		return getConfig({chains, publicClient, webSocketPublicClient});
	}, [supportedChains]);

	const ethereumClient = useMemo((): EthereumClient => new EthereumClient(config, supportedChains), [config, supportedChains]);

	return (
		<>
			<WagmiConfig config={config}>
				<Web3ContextAppWrapper options={options}>
					{children}
				</Web3ContextAppWrapper>
			</WagmiConfig>
			<Web3Modal
				projectId={process.env.WALLETCONNECT_PROJECT_ID as string}
				ethereumClient={ethereumClient} />
		</>
	);
};

export const useWeb3 = (): TWeb3Context => useContext(Web3Context);
