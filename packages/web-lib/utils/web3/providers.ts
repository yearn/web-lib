import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';

import type {ChainProviderFn} from 'wagmi';

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
	42161: 'https://arb1.croswap.com/rpc'
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

type TJsonRPCProvider = {http: string; webSocket?: string | undefined;}
/* 🔵 - Yearn Finance ******************************************************
** Connect to the RPC of the specific chain we want. Not all chains are
** supported and default is chain 1, aka ethereum mainnet.
**************************************************************************/
export function getProvider(chain = 1): ChainProviderFn {
	if (envRPCURI?.[chain]) {
		return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: envRPCURI?.[chain]})});
	}
	if (process.env.WEB_SOCKET_URL?.[chain]) {
		return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: process.env.JSON_RPC_URL?.[chain] as string, webSocket: process.env.WEB_SOCKET_URL?.[chain]})});
	}
	if (process.env.ALCHEMY_KEY && chain === 1) {
		return alchemyProvider({apiKey: process.env.ALCHEMY_KEY as string});
	}
	if (process.env.INFURA_KEY && chain === 1) {
		return infuraProvider({apiKey: process.env.INFURA_KEY as string});
	}
	if (defaultRPCURI?.[chain]) {
		return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: defaultRPCURI[chain]})});
	}

	//Fallback to chain 1
	if (envRPCURI?.[1]) {
		return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: envRPCURI?.[1]})});
	}
	if (process.env.WEB_SOCKET_URL?.[1]) {
		return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: process.env.JSON_RPC_URL?.[1] as string, webSocket: process.env.WEB_SOCKET_URL?.[1]})});
	}
	if (process.env.ALCHEMY_KEY) {
		return alchemyProvider({apiKey: process.env.ALCHEMY_KEY as string});
	}
	if (process.env.INFURA_KEY) {
		return infuraProvider({apiKey: process.env.INFURA_KEY as string});
	}
	return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: defaultRPCURI[1]})});
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
export function fromRPC(rpcURI: string): ChainProviderFn {
	if (rpcURI) {
		return jsonRpcProvider({rpc: (): TJsonRPCProvider => ({http: rpcURI})});
	}
	return alchemyProvider({apiKey: process.env.ALCHEMY_KEY as string});
}
