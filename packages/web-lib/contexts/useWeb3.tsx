import	React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {useAccount, useConnect, useDisconnect, useEnsName, useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig} from 'wagmi';
import {useIsMounted, useUpdateEffect} from '@react-hookz/web';
import {ModalLogin} from '@yearn-finance/web-lib/components/ModalLogin';
import {deepMerge} from '@yearn-finance/web-lib/contexts/utils';
import {useSupportedChainsID} from '@yearn-finance/web-lib/hooks/useSupportedChainsID';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {isIframe} from '@yearn-finance/web-lib/utils/helpers';

import type {ReactElement} from 'react';
import type {BaseError, FallbackTransport} from 'viem';
import type {Config, PublicClient, WebSocketPublicClient} from 'wagmi';
import type {TWeb3Context, TWeb3Options} from '@yearn-finance/web-lib/types/contexts';

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
			case 'walletConnect':
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

export const Web3ContextApp = ({children, config, options}: {
	children: ReactElement,
	config: Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>>,
	options?: TWeb3Options
}): ReactElement => {
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
