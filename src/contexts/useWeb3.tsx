import	React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import assert from 'assert';
import {useAccount, useConnect, useDisconnect, useEnsName, useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig} from 'wagmi';
import * as _RainbowKitProvider from '@rainbow-me/rainbowkit';
import {useIsMounted, useUpdateEffect} from '@react-hookz/web';

import {toast} from '../components/yToast.js';
import {toAddress} from '../utils/address.js';
import {isIframe} from '../utils/helpers.js';
import {getConfig, getSupportedProviders} from '../utils/wagmi/config.js';
import {configureChains} from '../utils/wagmi/configChain.tmp.js';
import {deepMerge} from './utils.js';

import type {ReactElement} from 'react';
import type {FallbackTransport} from 'viem';
import type {Config, PublicClient, WebSocketPublicClient} from 'wagmi';
import type {Chain} from '@wagmi/core';
import type {TWeb3Context, TWeb3Options} from '../types/contexts.js';

const {useConnectModal} = _RainbowKitProvider;
const {RainbowKitProvider} = (_RainbowKitProvider as any);

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
	const {connectors, connectAsync} = useConnect();
	const {disconnect} = useDisconnect();
	const {switchNetwork} = useSwitchNetwork();
	const {data: ensName} = useEnsName({address: address, chainId: 1});
	const {data: walletClient} = useWalletClient();
	const {chain} = useNetwork();
	const [currentChainID, set_currentChainID] = useState(chain?.id);
	const publicClient = usePublicClient();
	const isMounted = useIsMounted();
	const web3Options = deepMerge(defaultOptions, options) as TWeb3Options;
	const {openConnectModal} = useConnectModal();

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

	const onConnect = useCallback(async (): Promise<void> => {
		const ledgerConnector = connectors.find((c): boolean => c.id === 'ledgerLive');
		if (isIframe() && ledgerConnector) {
			await connectAsync({connector: ledgerConnector, chainId: currentChainID});
			return;
		}

		if (openConnectModal) {
			openConnectModal();
		} else {
			toast({type: 'warning', content: 'Impossible to open login modal'});
		}
	}, [openConnectModal]);

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

	const openLoginModal = useCallback(async (): Promise<void> => {
		const ledgerConnector = connectors.find((c): boolean => c.id === 'ledgerLive');
		if (isIframe() && ledgerConnector) {
			await connectAsync({connector: ledgerConnector, chainId: currentChainID});
			return;
		}

		if (openConnectModal) {
			openConnectModal();
		} else {
			toast({type: 'warning', content: 'Impossible to open login modal'});
		}
	}, [openConnectModal]);

	const contextValue = {
		address: address ? toAddress(address) : undefined,
		isConnecting,
		isDisconnected,
		ens: ensName || '',
		isActive: isConnected && [...supportedChainsID, 1337].includes(chain?.id || -1) && isMounted(),
		isWalletSafe: connector?.id === 'safe' || (connector as any)?._wallets?.[0]?.id === 'safe',
		isWalletLedger: (
			connector?.id === 'ledger' || (connector as any)?._wallets?.[0]?.id === 'ledger' || connector?.id === 'ledgerLive'
		),
		lensProtocolHandle: '',
		hasProvider: !!(walletClient || publicClient),
		provider: connector,
		chainID: isConnected ? Number(chain?.id || 1) : Number(currentChainID || 1),
		onConnect,
		onSwitchChain,
		openLoginModal,
		onDesactivate: onDesactivate,
		options: web3Options
	};

	return (
		<Web3Context.Provider value={contextValue}>
			{children}
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

	return (
		<WagmiConfig config={config}>
			<RainbowKitProvider chains={supportedChains}>
				<Web3ContextAppWrapper options={options}>
					{children}
				</Web3ContextAppWrapper>
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export const useWeb3 = (): TWeb3Context => useContext(Web3Context);
