'use client';

import {createConfig, createStorage} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {LedgerConnector} from 'wagmi/connectors/ledger';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {SafeConnector} from 'wagmi/connectors/safe';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';
import {publicProvider} from 'wagmi/providers/public';
import {noopStorage} from '@wagmi/core';
import {getNetwork} from '@yearn-finance/web-lib/utils/wagmi/utils';
import {InjectedConnector} from '@yearn-finance/web-lib/utils/web3/injectedConnector';
import {IFrameEthereumConnector} from '@yearn-finance/web-lib/utils/web3/ledgerConnector';

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
			new SafeConnector({chains, options: {allowedDomains: [/gnosis-safe.io/, /app.safe.global/]}}),
			new IFrameEthereumConnector({chains, options: {}}),
			new InjectedConnector({chains}),
			new MetaMaskConnector({chains}),
			new LedgerConnector({chains, options: {}}),
			new WalletConnectConnector({
				chains,
				options: {
					projectId: process.env.WALLETCONNECT_PROJECT_ID as string,
					metadata: {
						name: (process.env.WALLETCONNECT_PROJECT_NAME as string) || '',
						description: (process.env.WALLETCONNECT_PROJECT_DESCRIPTION as string) || '',
						url: (process.env.WALLETCONNECT_PROJECT_URL as string) || '',
						icons: [(process.env.WALLETCONNECT_PROJECT_ICON as string) || '']
					},
					qrModalOptions: {
						explorerRecommendedWalletIds: [
							'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
							'225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
							'1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
							'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
							'bc949c5d968ae81310268bf9193f9c9fb7bb4e1283e1284af8f2bd4992535fd6',
							'4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
							'a9751f17a3292f2d1493927f0555603d69e9a3fcbcdf5626f01b49afa21ced91'
						]
					}
				}
			}),
			new CoinbaseWalletConnector({
				chains,
				options: {
					jsonRpcUrl: getNetwork(1).defaultRPC,
					appName: process.env.WEBSITE_TITLE as string
				}
			})
		]
	});

	return config;
}
