import {Provider as EthCallProvider} from 'ethcall';
import {AlchemyProvider, InfuraProvider, JsonRpcProvider, WebSocketProvider} from 'ethers';

import type {Provider} from 'ethcall';
import type {TWeb3Provider} from '@yearn-finance/web-lib/contexts/types';

const	defaultRPCURI: {[key: number]: string} = {
	1: 'https://api.securerpc.com/v1',
	4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
	5: 'https://eth-goerli.public.blastapi.io',
	10: 'https://mainnet.optimism.io',
	56: 'https://bscrpc.com',
	100: 'https://rpc.gnosischainID.com',
	137: 'https://polygon-rpc.com',
	250: 'https://rpc.ftm.tools',
	420: 'https://goerli.optimism.io',
	1337: 'http://localhost:8545',
	31337: 'http://localhost:8545',
	42161: 'https://arbitrum.public-rpc.com'
};
export const	envRPCURI: {[key: number]: string} = {
	1: process.env.JSON_RPC_URL?.[1] || defaultRPCURI[1],
	4: process.env.JSON_RPC_URL?.[4] || defaultRPCURI[4],
	5: process.env.JSON_RPC_URL?.[5] || defaultRPCURI[5],
	10: process.env.JSON_RPC_URL?.[10] || defaultRPCURI[10],
	56: process.env.JSON_RPC_URL?.[56] || defaultRPCURI[56],
	100: process.env.JSON_RPC_URL?.[100] || defaultRPCURI[100],
	137: process.env.JSON_RPC_URL?.[137] || defaultRPCURI[137],
	250: process.env.JSON_RPC_URL?.[250] || defaultRPCURI[250],
	420: process.env.JSON_RPC_URL?.[420] || defaultRPCURI[420],
	1337: process.env.JSON_RPC_URL?.[1337] || defaultRPCURI[1337],
	31337: process.env.JSON_RPC_URL?.[31337] || defaultRPCURI[31337],
	42161: process.env.JSON_RPC_URL?.[42161] || defaultRPCURI[42161]
};

export	function	replaceEnvRPCURI(key: number, value: string): void {
	envRPCURI[key] = value;
}

/* 🔵 - Yearn Finance ******************************************************
** Create a multicall provider that can be used to call multiple functions
** at the same time.
** Some specific rules are added in order to support test networks.
**************************************************************************/
export async function newEthCallProvider(provider: TWeb3Provider): Promise<Provider> {
	const ethcallProvider = new EthCallProvider();
	const network = await provider.getNetwork();
	if (process.env.IS_TEST) {
		await	ethcallProvider.init(new JsonRpcProvider(defaultRPCURI[1337]) as any);
		if (Number(process.env.TESTED_NETWORK) === 250) {
			ethcallProvider.multicall = {address: '0xc04d660976c923ddba750341fe5923e47900cf24', block: 0};
			ethcallProvider.multicall2 = {address: '0x470ADB45f5a9ac3550bcFFaD9D990Bf7e2e941c9', block: 0};
		} else {
			ethcallProvider.multicall = {address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441', block: 0};
			ethcallProvider.multicall2 = {address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696', block: 0};
		}
		return ethcallProvider;
	}

	await	ethcallProvider.init(provider as any);
	if (network.chainId === BigInt(420)) {
		ethcallProvider.multicall2 = {address: '0xcA11bde05977b3631167028862bE2a173976CA11', block: 0};
		ethcallProvider.multicall3 = {address: '0xcA11bde05977b3631167028862bE2a173976CA11', block: 0};
	}
	ethcallProvider.multicall = null; //Remove multicall1 dependency
	return	ethcallProvider;
}

/* 🔵 - Yearn Finance ******************************************************
** Connect to the RPC of the specific chain we want. Not all chains are
** supported and default is chain 1, aka ethereum mainnet.
**************************************************************************/
export function getProvider(chain = 1): TWeb3Provider {
	if (envRPCURI?.[chain]) {
		return new JsonRpcProvider(envRPCURI?.[chain]);
	}
	if (process.env.WEB_SOCKET_URL?.[chain]) {
		return new WebSocketProvider(process.env.WEB_SOCKET_URL?.[chain]);
	}
	if (process.env.ALCHEMY_KEY && chain === 1) {
		return new AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
	}
	if (process.env.INFURA_KEY && chain === 1) {
		return new InfuraProvider('homestead', process.env.INFURA_KEY);
	}
	if (defaultRPCURI?.[chain]) {
		return new JsonRpcProvider(defaultRPCURI[chain]);
	}

	//Fallback to chain 1
	if (envRPCURI?.[1]) {
		return new JsonRpcProvider(envRPCURI?.[1]);
	}
	if (process.env.WEB_SOCKET_URL?.[1]) {
		return new WebSocketProvider(process.env.WEB_SOCKET_URL?.[1]);
	}
	if (process.env.ALCHEMY_KEY) {
		return new AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
	}
	if (process.env.INFURA_KEY) {
		return new InfuraProvider('homestead', process.env.INFURA_KEY);
	}
	return new JsonRpcProvider(defaultRPCURI?.[1] || '');
}

/* 🔵 - Yearn Finance ******************************************************
** Retrieve the RPC for a specific chain.
**************************************************************************/
export function getRPC(chainID = 1): string {
	if (process.env.JSON_RPC_URL?.[chainID]) {
		return (process.env.JSON_RPC_URL[chainID]);
	}
	if (defaultRPCURI?.[chainID]) {
		return defaultRPCURI?.[chainID];
	}
	return (defaultRPCURI[1]);
}


/* 🔵 - Yearn Finance ******************************************************
** Connect to the RPC from a specific RPC
**************************************************************************/
export function fromRPC(rpcURI: string): TWeb3Provider {
	if (rpcURI) {
		return new JsonRpcProvider(rpcURI);
	}
	return (new AlchemyProvider('homestead', process.env.ALCHEMY_KEY));
}
