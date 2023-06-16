/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {createWalletClient, custom, toHex} from 'viem';
import {ChainNotConfiguredError, Connector, ConnectorNotFoundError} from '@wagmi/core';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {IFrameEthereumProvider} from '@yearn-finance/web-lib/utils/web3/connectors.eip1193.ledger';

import type {ProviderRpcError, RpcError} from 'viem';
import type {Chain} from '@wagmi/core';

type IFrameEthereumProviderOptions = ConstructorParameters<
  typeof IFrameEthereumProvider
>[0];

function normalizeChainId(chainId: string | number | bigint) {
	if (typeof chainId === 'string') {
		return Number.parseInt(
			chainId,
			chainId.trim().substring(0, 2) === '0x' ? 16 : 10
		);
	}
	if (typeof chainId === 'bigint') {
		return Number(chainId);
	}
	return chainId;
}

export class IFrameEthereumConnector extends Connector<IFrameEthereumProvider, IFrameEthereumProviderOptions> {
	readonly id = 'ledgerLive';

	readonly name = 'Ledger Live';

	readonly ready = true;

	providerInstance?: IFrameEthereumProvider;

	async connect({chainId}: { chainId?: number } = {}) {
		try {
			const provider = await this.getProvider();
			if (!provider) {
				throw new ConnectorNotFoundError();
			}

			if (provider.on) {
				provider.on('accountsChanged', this.onAccountsChanged);
				provider.on('chainChanged', this.onChainChanged);
			}

			this.emit('message', {type: 'connecting'});

			const account = await this.getAccount();
			// Switch to chain if provided
			let id = await this.getChainId();
			let isUnsupported = this.isChainUnsupported(id);
			if (chainId && id !== chainId) {
				const chain = await this.switchChain(chainId);
				id = chain.id;
				isUnsupported = this.isChainUnsupported(id);
			}

			return {account, chain: {id, unsupported: isUnsupported}, provider};
		} catch (error) {
			if (this.isUserRejectedRequestError(error)) {
				throw new Error('User Rejected Request');
			}
			if ((error as RpcError).code === -32002) {
				throw new Error('Resource Unavailable');
			}
			throw error;
		}
	}

	async disconnect() {
		const provider = await this.getProvider();
		if (!provider?.removeListener) {
			return;
		}

		provider.removeListener('accountsChanged', this.onAccountsChanged);
		provider.removeListener('chainChanged', this.onChainChanged);
	}

	async getAccount() {
		const provider = await this.getProvider();
		if (!provider) {
			throw new ConnectorNotFoundError();
		}
		const accounts = await provider.send('eth_requestAccounts');
		// return checksum address
		return toAddress(accounts[0]);
	}

	async getChainId() {
		const provider = await this.getProvider();
		if (!provider) {
			throw new ConnectorNotFoundError();
		}
		return provider.send('eth_chainId').then(normalizeChainId);
	}

	async getProvider() {
		if (!this.providerInstance) {
			this.providerInstance = new IFrameEthereumProvider(this.options);
		}

		return this.providerInstance;
	}

	async getWalletClient({chainId}: { chainId?: number } = {}): Promise<any> {
		const [provider, account] = await Promise.all([
			this.getProvider(),
			this.getAccount()
		]);
		const chain = this.chains.find((x) => x.id === chainId);
		if (!provider) {
			throw new Error('provider is required.');
		}

		return createWalletClient({
			account: toAddress(account),
			chain,
			transport: custom(provider)
		});
	}

	async isAuthorized() {
		try {
			const provider = await this.getProvider();
			if (!provider) {
				throw new ConnectorNotFoundError();
			}
			const accounts = await provider.send('eth_accounts');
			const account = accounts[0];
			return !!account;
		} catch {
			return false;
		}
	}

	override async switchChain(chainId: number): Promise<Chain> {
		const provider = await this.getProvider();
		if (!provider) {
			throw new ConnectorNotFoundError();
		}
		const id = toHex(chainId);

		try {
			await provider.send('wallet_switchEthereumChain', [{chainId: id}]);

			return (
				this.chains.find((x) => x.id === chainId) ?? {
					id: chainId,
					name: `Chain ${id}`,
					network: `${id}`,
					nativeCurrency: {decimals: 18, name: 'Ether', symbol: 'ETH'},
					rpcUrls: {default: {http: ['']}, public: {http: ['']}}
				}
			);
		} catch (error) {
			const chain = this.chains.find((x) => x.id === chainId);
			if (!chain) {
				throw new ChainNotConfiguredError({chainId, connectorId: this.id});
			}

			// Indicates chain is not added to provider
			if ((error as ProviderRpcError).code === 4902 || (error as any)?.data?.originalError?.code === 4902) {
				try {
					await provider.send('wallet_addEthereumChain', [
						{
							chainId: id,
							chainName: chain.name,
							nativeCurrency: chain.nativeCurrency,
							rpcUrls: [chain.rpcUrls.public ?? chain.rpcUrls.default],
							blockExplorerUrls: this.getBlockExplorerUrls(chain)
						}
					]);

					return chain;
				} catch (addError) {
					if (this.isUserRejectedRequestError(addError)) {
						throw new Error('User Rejected Request');
					}
					throw new Error(`Failed to add chain ${chainId}: ${addError}`);
				}
			}

			if (this.isUserRejectedRequestError(error)) {
				throw new Error('User Rejected Request');
			}
			throw new Error(`Failed to switch chain ${chainId}: ${error}`);
		}
	}

	override async watchAsset({
		address,
		decimals = 18,
		image,
		symbol
	}: {
		address: string;
		decimals?: number;
		image?: string;
		symbol: string;
	}) {
		const provider = await this.getProvider();
		if (!provider) {
			throw new ConnectorNotFoundError();
		}

		return provider.send('wallet_watchAsset', [
			{
				type: 'ERC20',
				options: {
					address,
					decimals,
					image,
					symbol
				}
			}
		]);
	}

	protected onAccountsChanged = (accounts: string[]) => {
		if (accounts.length === 0 || !accounts[0]) {
			this.emit('disconnect');
		} else {
			this.emit('change', {account: toAddress(accounts[0])});
		}
	};

	protected onChainChanged = (chainId: number | string) => {
		const id = normalizeChainId(chainId);
		const isUnsupported = this.isChainUnsupported(id);
		this.emit('change', {chain: {id, unsupported: isUnsupported}});
	};

	// eslint-disable-next-line class-methods-use-this
	protected isUserRejectedRequestError(error: unknown) {
		return (error as ProviderRpcError).code === 4001;
	}

	protected onDisconnect = () => {
		this.emit('disconnect');
	};
}
