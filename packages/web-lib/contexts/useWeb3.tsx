import	React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {arbitrum, fantom, gnosis, optimism, polygon} from 'viem/chains';
import {configureChains, createConfig, mainnet, useAccount, useConnect, useDisconnect, useEnsName, useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {LedgerConnector} from 'wagmi/connectors/ledger';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {SafeConnector} from 'wagmi/connectors/safe';
import {WalletConnectLegacyConnector} from 'wagmi/connectors/walletConnectLegacy';
import {publicProvider} from 'wagmi/providers/public';
import {useIsMounted, useUpdateEffect} from '@react-hookz/web';
import {ModalLogin} from '@yearn-finance/web-lib/components/ModalLogin';
import {deepMerge} from '@yearn-finance/web-lib/contexts/utils';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {isIframe} from '@yearn-finance/web-lib/utils/helpers';
import {IFrameEthereumConnector} from '@yearn-finance/web-lib/utils/web3/ledgerConnector';
import {getRPC} from '@yearn-finance/web-lib/utils/web3/providers';

import {useSupportedChainsID} from '../hooks/useSupportedChainsID';

import type {ReactElement} from 'react';
import type {BaseError, FallbackTransport} from 'viem';
import type {Chain, Config, PublicClient, WebSocketPublicClient} from 'wagmi';
import type {TWeb3Context, TWeb3Options} from '@yearn-finance/web-lib/types/contexts';

const localhost = {
	id: 1_337,
	name: 'Localhost',
	network: 'localhost',
	nativeCurrency: {
		decimals: 18,
		name: 'Ether',
		symbol: 'ETH'
	},
	rpcUrls: {
		default: {http: ['http://0.0.0.0:8545', 'http://127.0.0.1:8545', 'http://localhost:8545']},
		public: {http: ['http://0.0.0.0:8545', 'http://127.0.0.1:8545', 'http://localhost:8545']}
	},
	contracts: {
		ensRegistry: {
			address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
		},
		ensUniversalResolver: {
			address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
			blockCreated: 16773775
		},
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 14353601
		}
	}
} as const satisfies Chain;

const defaultState = {
	address: undefined,
	ens: undefined,
	lensProtocolHandle: undefined,
	chainID: 1,
	isDisconnected: false,
	isActive: false,
	isConnecting: false,
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
const {chains, publicClient, webSocketPublicClient} = configureChains(
	[mainnet, optimism, polygon, gnosis, fantom, arbitrum, localhost],
	[publicProvider()]
);
const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: [
		new SafeConnector({chains, options: {allowedDomains: [/gnosis-safe.io/, /app.safe.global/]}}),
		new IFrameEthereumConnector({chains, options: {}}),
		new InjectedConnector({chains}),
		new MetaMaskConnector(),
		new LedgerConnector({chains}),
		new WalletConnectLegacyConnector({options: {qrcode: true}}),
		new CoinbaseWalletConnector({
			options: {
				jsonRpcUrl: getRPC(1),
				appName: process.env.WEBSITE_TITLE as string
			}
		})
	]
});

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
	const supportedChainsID = useSupportedChainsID();
	const [isModalLoginOpen, set_isModalLoginOpen] = useState(false);

	useUpdateEffect((): void => {
		set_currentChainID(chain?.id);
	}, [chain]);

	const onConnect = useCallback(async (
		providerType: string,
		onError?: ((error: Error) => void) | undefined,
		onSuccess?: (() => void) | undefined
	): Promise<void> => {
		try {
			if (isIframe()) {
				const r = await Promise.race([
					connectAsync({connector: connectors[0], chainId: currentChainID}),
					connectAsync({connector: connectors[1], chainId: currentChainID})
				]);
				if (r?.account) {
					return onSuccess?.();
				}
			}

			if (providerType === 'INJECTED') {
				await connectAsync({connector: connectors[2], chainId: currentChainID});
			} else if (providerType === 'INJECTED_LEDGER') {
				await connectAsync({connector: connectors[4], chainId: currentChainID});
			} else if (providerType === 'WALLET_CONNECT') {
				await connectAsync({connector: connectors[5], chainId: currentChainID});
			} else if (providerType === 'EMBED_LEDGER') {
				await connectAsync({connector: connectors[1], chainId: currentChainID});
			} else if (providerType === 'EMBED_GNOSIS_SAFE') {
				await connectAsync({connector: connectors[0], chainId: currentChainID});
			} else if (providerType === 'EMBED_COINBASE') {
				await connectAsync({connector: connectors[6], chainId: currentChainID});
			} else if (providerType === 'EMBED_TRUSTWALLET') {
				await connectAsync({connector: connectors[2], chainId: currentChainID});
			} else {
				await connectAsync({connector: connectors[2], chainId: currentChainID});
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
			case 'coinbaseWallet':
				return ('EMBED_COINBASE');
			default:
				return ('INJECTED');
		}
	}, [connector]);

	const openLoginModal = useCallback(async (): Promise<void> => {
		if (isIframe()) {
			const r = await Promise.race([
				connectAsync({connector: connectors[0]}),
				connectAsync({connector: connectors[1]})
			]);
			if (r?.account) {
				return;
			}
		}
		set_isModalLoginOpen(true);
	}, [connectAsync, connectors]);

	const contextValue = {
		address: address ? toAddress(address) : undefined,
		isConnecting,
		isDisconnected,
		ens: ensName || '',
		isActive: isConnected && supportedChainsID.includes(chain?.id || -1) && isMounted(),
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

export const Web3ContextApp = ({children, configOverwrite, options}: {
	children: ReactElement,
	configOverwrite?: Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>>,
	options?: TWeb3Options
}): ReactElement => {
	return (
		<WagmiConfig config={configOverwrite || config}>
			<Web3ContextAppWrapper options={options}>
				{children}
			</Web3ContextAppWrapper>
		</WagmiConfig>
	);
};

export const useWeb3 = (): TWeb3Context => useContext(Web3Context);
export default useWeb3;
