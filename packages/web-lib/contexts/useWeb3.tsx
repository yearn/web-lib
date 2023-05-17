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
import {ModalLogin} from '@yearn-finance/web-lib/components/ModalLogin';
import {deepMerge} from '@yearn-finance/web-lib/contexts/utils';
import {useAutoConnect} from '@yearn-finance/web-lib/hooks/useAutoConnect';
import {IFrameEthereumConnector} from '@yearn-finance/web-lib/utils/web3/ledgerConnector';
import {getRPC} from '@yearn-finance/web-lib/utils/web3/providers';

import {toAddress} from '../utils/address';

import type {ReactElement} from 'react';
import type {Chain} from 'wagmi';
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
		default: {http: ['http://127.0.0.1:8545']},
		public: {http: ['http://127.0.0.1:8545']}
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
const	defaultOptions = {
	shouldUseWallets: true,
	defaultChainID: 1,
	supportedChainID: [1, 4, 5, 10, 56, 100, 137, 250, 420, 1337, 31337, 42161]
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
		new LedgerConnector({chains: [mainnet]}),
		new InjectedConnector({chains}),
		new MetaMaskConnector(),
		new IFrameEthereumConnector({chains, options: {}}),
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
	const publicClient = usePublicClient();
	const web3Options = deepMerge(defaultOptions, options) as TWeb3Options;
	const [isModalLoginOpen, set_isModalLoginOpen] = useState(false);

	useAutoConnect();

	const onConnect = useCallback(async (
		providerType: string,
		onError?: ((error: Error) => void) | undefined,
		onSuccess?: (() => void) | undefined
	): Promise<void> => {
		try {
			if (providerType === 'INJECTED' || providerType === 'INJECTED_LEDGER') {
				await connectAsync({connector: connectors[2]});
			} else if (providerType === 'WALLET_CONNECT') {
				await connectAsync({connector: connectors[5]});
			} else if (providerType === 'EMBED_LEDGER') {
				await connectAsync({connector: connectors[1]});
			} else if (providerType === 'EMBED_GNOSIS_SAFE') {
				await connectAsync({connector: connectors[0]});
			} else if (providerType === 'EMBED_COINBASE') {
				await connectAsync({connector: connectors[6]});
			} else if (providerType === 'EMBED_TRUSTWALLET') {
				await connectAsync({connector: connectors[2]});
			} else {
				await connectAsync({connector: connectors[2]});
			}
			onSuccess?.();
		} catch (error) {
			onError?.(error as unknown as Error);
		}
	}, [connectAsync, connectors]);

	const onDesactivate = useCallback((): void => {
		disconnect();
	}, [disconnect]);

	const	onSwitchChain = useCallback((newChainID: number, force?: boolean): void => {
		if (force) {
			console.warn('onSwitchChain with force parameter is deprecated');
		}
		switchNetwork?.(newChainID);
	}, [switchNetwork]);

	const openLoginModal = useCallback(async (): Promise<void> => {
		set_isModalLoginOpen(true);
	}, []);

	const	contextValue = useMemo((): TWeb3Context => {
		return ({
			address: toAddress(address),
			isConnecting,
			isDisconnected,
			ens: ensName || '',
			isActive: isConnected && (web3Options.supportedChainID || defaultOptions.supportedChainID).includes(chain?.id || -1),
			lensProtocolHandle: '',
			hasProvider: !!(walletClient || publicClient),
			provider: connector,
			chainID: Number(chain?.id || 0),
			onConnect,
			onSwitchChain,
			openLoginModal,
			onDesactivate: onDesactivate,
			options: web3Options,
			walletType: 'NONE'
		});
	}, [address, chain?.id, connector, ensName, isConnected, isConnecting, isDisconnected, onConnect, onDesactivate, onSwitchChain, openLoginModal, publicClient, walletClient, web3Options]);

	return (
		<Web3Context.Provider value={contextValue}>
			{children}
			<ModalLogin
				isOpen={isModalLoginOpen}
				onClose={(): void => set_isModalLoginOpen(false)} />
		</Web3Context.Provider>
	);
};

export const Web3ContextApp = ({children, options}: {children: ReactElement, options?: TWeb3Options}): ReactElement => {
	return (
		<WagmiConfig config={config}>
			<Web3ContextAppWrapper options={options}>
				{children}
			</Web3ContextAppWrapper>
		</WagmiConfig>
	);
};

export const useWeb3 = (): TWeb3Context => useContext(Web3Context);
export default useWeb3;
