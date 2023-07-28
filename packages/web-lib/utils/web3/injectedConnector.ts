import {numberToHex, SwitchChainError, UserRejectedRequestError} from 'viem';
import {ConnectorNotFoundError, InjectedConnector as WagmiInjectedConnector} from '@wagmi/core';

import type {ProviderRpcError} from 'viem';
import type {Chain, InjectedConnectorOptions} from '@wagmi/core';

export type TInjectedConnectorOptions = InjectedConnectorOptions

export class ChainNotConfiguredForConnectorError extends Error {
	name = 'ChainNotConfiguredForConnectorError';

	constructor({
		chainId,
		connectorId
	}: {
		chainId: number
		connectorId?: string
	}) {
		super(`Chain "${chainId}" not configured for connector "${connectorId}".`);
	}
}

export class InjectedConnector extends WagmiInjectedConnector {
	readonly id = 'Injected';

	async switchChain(chainId: number): Promise<Chain> {
		const provider = await this.getProvider();
		if (!provider) {
			throw new ConnectorNotFoundError();
		}
		const id = numberToHex(chainId);
		try {
			await Promise.all([
				provider.request({
					method: 'wallet_switchEthereumChain',
					params: [{chainId: id}]
				}),
				new Promise<void>((res): void => {
					this.onChainChanged(chainId);
					this.on('change', ({chain}): void => {
						if (chain?.id === chainId) {
							res();
						}
					});
				})
			]);
			return (
				this.chains.find((x): boolean => x.id === chainId) ?? {
					id: chainId,
					name: `Chain ${id}`,
					network: `${id}`,
					nativeCurrency: {name: 'Ether', decimals: 18, symbol: 'ETH'},
					rpcUrls: {default: {http: ['']}, public: {http: ['']}}
				}
			);
		} catch (error) {
			console.log(error);
			const chain = this.chains.find((x): boolean => x.id === chainId);
			if (!chain) {
				throw new ChainNotConfiguredForConnectorError({
					chainId,
					connectorId: this.id
				});
			}

			// Indicates chain is not added to provider
			if (
				(error as ProviderRpcError).code === 4902 ||
				// Unwrapping for MetaMask Mobile
				// https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
				(error as ProviderRpcError<{ originalError?: { code: number } }>)?.data
					?.originalError?.code === 4902
			) {
				try {
					await provider.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: id,
								chainName: chain.name,
								nativeCurrency: chain.nativeCurrency,
								rpcUrls: [chain.rpcUrls.public?.http[0] ?? ''],
								blockExplorerUrls: this.getBlockExplorerUrls(chain)
							}
						]
					});

					const currentChainId = await this.getChainId();
					if (currentChainId !== chainId) {
						throw new UserRejectedRequestError(
							new Error('User rejected switch after adding network.')
						);
					}

					return chain;
				} catch (error) {
					throw new UserRejectedRequestError(error as Error);
				}
			}

			if (this.isUserRejectedRequestError(error)) {
				throw new UserRejectedRequestError(error as Error);
			}
			throw new SwitchChainError(error as Error);
		}
	}
}
