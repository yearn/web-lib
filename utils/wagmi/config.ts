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
				options: {projectId: process.env.WALLETCONNECT_PROJECT_ID as string}
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
