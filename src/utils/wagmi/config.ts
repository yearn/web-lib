import {createConfig, createStorage} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';
import {publicProvider} from 'wagmi/providers/public';
import {connectorsForWallets,getDefaultWallets} from '@rainbow-me/rainbowkit';
import {ledgerWallet, safeWallet} from '@rainbow-me/rainbowkit/wallets';
import {noopStorage} from '@wagmi/core';

import {getNetwork} from '../wagmi/utils';
import {IFrameEthereumConnector} from '../web3/ledgerConnector';

import type {FallbackTransport} from 'viem';
import type {Chain, ChainProviderFn, Config, PublicClient, WebSocketPublicClient} from 'wagmi';

export function getSupportedProviders<TChain extends Chain = Chain>(): ChainProviderFn<TChain>[] {
	const supportedProviders = [
		jsonRpcProvider({
			rpc: (chain): {http: string} => {
				if (!getNetwork(chain.id)) {
					return {http: ''};
				}
				return ({http: getNetwork(chain.id).defaultRPC});
			}
		}),
		publicProvider()
	];

	if (process.env.ALCHEMY_KEY) {
		supportedProviders.push(alchemyProvider({apiKey: process.env.ALCHEMY_KEY || ''}));
	}
	if (process.env.INFURA_PROJECT_ID) {
		supportedProviders.push(infuraProvider({apiKey: process.env.INFURA_PROJECT_ID || ''}));
	}
	return supportedProviders as unknown as ChainProviderFn<TChain>[];
}

export function getConfig({chains, publicClient, webSocketPublicClient}: {
	chains: Chain[]
	publicClient: ({chainId}: { chainId?: number | undefined; }) => PublicClient<FallbackTransport>
	webSocketPublicClient: ({chainId}: { chainId?: number | undefined; }) => WebSocketPublicClient<FallbackTransport> | undefined
}): Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>> {
	const {wallets: rainbowWallets} = getDefaultWallets({
		appName:(process.env.WALLETCONNECT_PROJECT_NAME as string) || '',
		projectId: process.env.WALLETCONNECT_PROJECT_ID as string,
		chains
<<<<<<< HEAD
	});
	const projectId = process.env.WALLETCONNECT_PROJECT_ID as string;
	const rainbowConnector = connectorsForWallets([
		...rainbowWallets,
		{
			groupName: 'Others',
			wallets: [
				safeWallet({chains}),
				ledgerWallet({projectId, chains})
			]
		}
	]);
=======
	})
	const wagmiConfig = createConfig({
		autoConnect: true,
		connectors: rainbowConnector,
		publicClient
	}) as any

>>>>>>> 41a09f9 (feat: bump)

	const config = createConfig({
		storage: createStorage({
			// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
			storage: (typeof window !== 'undefined' && window.sessionStorage)
				? window.sessionStorage
				: noopStorage
		}),
		autoConnect: true,
		publicClient,
		webSocketPublicClient,
		connectors: [
			...rainbowConnector(),
			new IFrameEthereumConnector({chains, options: {}})
		]
	});

	config;

	return wagmiConfig;
}
