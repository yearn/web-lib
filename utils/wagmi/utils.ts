import assert from 'assert';
import {createPublicClient, http} from 'viem';
import * as wagmiChains from '@wagmi/chains';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {ARB_WETH_TOKEN_ADDRESS, OPT_WETH_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, WFTM_TOKEN_ADDRESS, ZAP_ETH_WETH_CONTRACT, ZAP_ETH_WETH_OPT_CONTRACT, ZAP_FTM_WFTM_CONTRACT, ZERO_ADDRESS} from '@yearn-finance/web-lib/utils/constants';
import {isEth} from '@yearn-finance/web-lib/utils/isEth';
import {isTAddress} from '@yearn-finance/web-lib/utils/isTAddress';
import {localhost} from '@yearn-finance/web-lib/utils/wagmi/networks';

import type {Chain, PublicClient} from 'viem';
import type {TAddress} from '@yearn-finance/web-lib/types';

export type TChainContract = {
	address: TAddress
	blockCreated?: number
}
/* 🔵 - Yearn Finance ******************************************************************************
** partnerContractAddress contains the data for the partner contracts on each chain
**************************************************************************************************/
const partnerContractAddress: {[key: number]: TChainContract} = {
	1: {
		address: toAddress('0x8ee392a4787397126C163Cb9844d7c447da419D8'),
		blockCreated: 14166636
	},
	10: {
		address: toAddress('0x7E08735690028cdF3D81e7165493F1C34065AbA2'),
		blockCreated: 29675215
	},
	250: {
		address: toAddress('0x086865B2983320b36C42E48086DaDc786c9Ac73B'),
		blockCreated: 40499061
	},
	42161: {
		address: toAddress('0x0e5b46E4b2a05fd53F5a4cD974eb98a9a613bcb7'),
		blockCreated: 30385403
	},
	1337: {
		address: toAddress('0x8ee392a4787397126C163Cb9844d7c447da419D8'),
		blockCreated: 14166636
	}
};

/* 🔵 - Yearn Finance ******************************************************************************
** zapEthContractAddress contains the data for the zap eth contract used by the given chain
**************************************************************************************************/
const zapEthContractAddress: {[key: number]: TChainContract & {destinationVault: TAddress}} = {
	1: {
		address: ZAP_ETH_WETH_CONTRACT,
		destinationVault: toAddress('0xa258C4606Ca8206D8aA700cE2143D7db854D168c'),
		blockCreated: 15037920
	},
	10: {
		address: ZAP_ETH_WETH_OPT_CONTRACT,
		destinationVault: toAddress('0x5b977577eb8a480f63e11fc615d6753adb8652ae'),
		blockCreated: 99238952
	},
	250: {
		address: ZAP_FTM_WFTM_CONTRACT,
		destinationVault: toAddress('0x0dec85e74a92c52b7f708c4b10207d9560cefaf0'),
		blockCreated: 16994269
	},
	1337: {
		address: ZAP_ETH_WETH_CONTRACT,
		destinationVault: toAddress('0xa258C4606Ca8206D8aA700cE2143D7db854D168c'),
		blockCreated: 15037920
	}
};

/* 🔵 - Yearn Finance ******************************************************************************
** wrappedChainTokens contains the data for the wrapped tokens used by the given chain, with the
** name of the token, the symbol, the decimals, the address, the name of the coin, and the symbol
** of the coin.
**************************************************************************************************/
export type TWrappedChainToken = {
	address: TAddress //Token address
	decimals: number //Token decimals
	symbol: string //Token symbol
	name: string //Token name
	coinName: string //Coin name (e.g. Ether)
	coinSymbol: string //Coin symbol (e.g. ETH)
}
const wrappedChainTokens: {[key: number]: TWrappedChainToken} = {
	1: {
		address: WETH_TOKEN_ADDRESS,
		decimals: 18,
		symbol: 'wETH',
		name: 'Wrapped Ether',
		coinName: 'Ether',
		coinSymbol: 'ETH'
	},
	10: {
		address: OPT_WETH_TOKEN_ADDRESS,
		decimals: 18,
		symbol: 'wETH',
		name: 'Wrapped Ether',
		coinName: 'Ether',
		coinSymbol: 'ETH'
	},
	137: {
		address: toAddress('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'),
		decimals: 18,
		symbol: 'wMatic',
		name: 'Wrapped Matic',
		coinName: 'Matic',
		coinSymbol: 'MATIC'
	},
	1101: {
		address: toAddress('0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9'),
		decimals: 18,
		symbol: 'wETH',
		name: 'Wrapped Ether',
		coinName: 'Ether',
		coinSymbol: 'ETH'
	},
	250: {
		address: WFTM_TOKEN_ADDRESS,
		decimals: 18,
		symbol: 'wFTM',
		name: 'Wrapped Fantom',
		coinName: 'Fantom',
		coinSymbol: 'FTM'
	},
	42161: {
		address: ARB_WETH_TOKEN_ADDRESS,
		decimals: 18,
		symbol: 'wETH',
		name: 'Wrapped Ether',
		coinName: 'Ether',
		coinSymbol: 'ETH'
	},
	1337: {
		address: WETH_TOKEN_ADDRESS,
		decimals: 18,
		symbol: 'wETH',
		name: 'Wrapped Ether',
		coinName: 'Ether',
		coinSymbol: 'ETH'
	}
};

/* 🔵 - Yearn Finance ******************************************************************************
** Extended Chain type is used to add additional properties to the basic wagmi Chain type.
** For Yearn's use case, we need to add:
** - the default RPC and block explorer URLs for each chain.
** - the address of the partner contract for each chain.
** - the wrapped token data for each chain.
**************************************************************************************************/
export type TExtendedChain = Chain & {
	defaultRPC: string
	defaultBlockExplorer: string
	contracts: {
		partnerContract?: TChainContract
		zapEthContract?: TChainContract & {destinationVault: TAddress}
		wrappedToken?: TWrappedChainToken
	}
}

export const indexedWagmiChains = Object.values(wagmiChains).reduce((acc: {[key: number]: TExtendedChain}, chain: Chain): {[key: number]: TExtendedChain} => {
	if (!chain) {
		return acc;
	}
	if (typeof chain !== 'object' || !chain.id) {
		return acc;
	}

	let extendedChain = chain as TExtendedChain;
	if (extendedChain.id === 1337) {
		extendedChain = localhost as unknown as TExtendedChain;
	}

	extendedChain.contracts = {
		...chain.contracts,
		partnerContract: partnerContractAddress[chain.id],
		zapEthContract: zapEthContractAddress[chain.id],
		wrappedToken: wrappedChainTokens[chain.id]
	};
	extendedChain.defaultRPC = process.env.JSON_RPC_URL?.[chain.id] || chain?.rpcUrls?.public?.http?.[0] || '';
	extendedChain.defaultBlockExplorer = chain.blockExplorers?.[0]?.url || chain.blockExplorers?.default.url || 'https://etherscan.io';
	acc[chain.id] = extendedChain;
	return acc;
}, {});

export function getNetwork(chainID: number): TExtendedChain {
	if (!indexedWagmiChains[chainID]) {
		throw new Error(`Chain ${chainID} is not supported`);
	}
	return indexedWagmiChains[chainID];
}

export function getClient(chainID: number): PublicClient {
	if (!indexedWagmiChains[chainID]) {
		throw new Error(`Chain ${chainID} is not supported`);
	}
	let url = process.env.JSON_RPC_URL?.[chainID] || indexedWagmiChains?.[chainID]?.rpcUrls?.public?.http?.[0] || '';
	const urlAsNodeURL = new URL(url);
	let headers = {};
	if (urlAsNodeURL.username && urlAsNodeURL.password) {
		headers = {
			'Authorization': `Basic ${btoa(urlAsNodeURL.username + ':' + urlAsNodeURL.password)}`
		};
		url = urlAsNodeURL.href.replace(`${urlAsNodeURL.username}:${urlAsNodeURL.password}@`, '');
		return createPublicClient({
			chain: indexedWagmiChains[chainID],
			transport: http(url, {fetchOptions: {headers}})
		});
	}
	return createPublicClient({chain: indexedWagmiChains[chainID], transport: http(url)});
}

export function assertAddress(addr: string | TAddress | undefined, name?: string): asserts addr is TAddress {
	assert(addr, `${name || 'Address'} is not set`);
	assert(isTAddress(addr), `${name || 'Address'} provided is invalid`);
	assert(toAddress(addr) !== ZERO_ADDRESS, `${name || 'Address'} is 0x0`);
	assert(!isEth(addr), `${name || 'Address'} is 0xE`);
}
