import	{ethers}		from	'ethers';
import	{Provider}		from	'ethcall';

/* 🔵 - Yearn Finance ******************************************************
** Create a multicall provider that can be used to call multiple functions
** at the same time.
** Some specific rules are added in order to support test networks.
**************************************************************************/
export async function newEthCallProvider(provider: ethers.providers.Provider): Promise<Provider> {
	const	ethcallProvider = new Provider();
	if (process.env.IS_TEST) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		if (Number(process.env.TESTED_NETWORK) === 250) {
			ethcallProvider.multicall = {address: '0xc04d660976c923ddba750341fe5923e47900cf24', block: 0};
			ethcallProvider.multicall2 = {address: '0x470ADB45f5a9ac3550bcFFaD9D990Bf7e2e941c9', block: 0};
		} else {
			ethcallProvider.multicall = {address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441', block: 0};
			ethcallProvider.multicall2 = {address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696', block: 0};
		}

		return ethcallProvider;
	}
	await	ethcallProvider.init(provider as ethers.providers.BaseProvider);
	return	ethcallProvider;
}

/* 🔵 - Yearn Finance ******************************************************
** Connect to the RPC of the specific chain we want. Not all chains are
** supported and default is chain 1, aka ethereum mainnet.
**************************************************************************/
export function getProvider(chain = 1): ethers.providers.BaseProvider | ethers.providers.Web3Provider {
	if (chain === 1) {
		if (process.env.WEB_SOCKET_URL?.[1])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[1]);
		if (process.env.JSON_RPC_URL?.[1])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[1]);
		if (process.env.ALCHEMY_KEY)
			return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
		if (process.env.INFURA_KEY)
			return new ethers.providers.InfuraProvider('homestead', process.env.INFURA_KEY);
		return new ethers.providers.JsonRpcProvider('https://rpc.flashbots.net');
	} else if (chain === 4) {
		if (process.env.WEB_SOCKET_URL?.[4])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[4]);
		if (process.env.JSON_RPC_URL?.[4])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[4]);
		return new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`);
	} else if (chain === 56) {
		if (process.env.WEB_SOCKET_URL?.[56])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[56]);
		if (process.env.JSON_RPC_URL?.[56])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[56]);
		return new ethers.providers.JsonRpcProvider('https://bscrpc.com');
	} else if (chain === 100) {
		if (process.env.WEB_SOCKET_URL?.[100])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[100]);
		if (process.env.JSON_RPC_URL?.[100])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[100]);
		return new ethers.providers.JsonRpcProvider('https://rpc.gnosischain.com');
	} else if (chain === 137) {
		if (process.env.WEB_SOCKET_URL?.[137])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[137]);
		if (process.env.JSON_RPC_URL?.[137])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[137]);
		return new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
	} else if (chain === 250) {
		if (process.env.WEB_SOCKET_URL?.[250])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[250]);
		if (process.env.JSON_RPC_URL?.[250])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[250]);
		return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
	} else if (chain === 1337 || chain === 31337) {
		return new ethers.providers.JsonRpcProvider('http://localhost:8545');
	} else if (chain === 42161) {
		if (process.env.WEB_SOCKET_URL?.[42161])
			return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[42161]);
		if (process.env.JSON_RPC_URL?.[42161])
			return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[42161]);
		return new ethers.providers.JsonRpcProvider('https://arbitrum.public-rpc.com');
	}

	//Fallback to chain 1
	if (process.env.WEB_SOCKET_URL?.[1])
		return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[1]);
	if (process.env.JSON_RPC_URL?.[1])
		return new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL?.[1]);
	if (process.env.ALCHEMY_KEY)
		return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
	if (process.env.INFURA_KEY)
		return new ethers.providers.InfuraProvider('homestead', process.env.INFURA_KEY);
	return new ethers.providers.JsonRpcProvider('https://rpc.flashbots.net');
}

/* 🔵 - Yearn Finance ******************************************************
** Retrieve the RPC for a specific chain.
**************************************************************************/
export function getRPC(chain = 1): string {
	if (chain === 1) {
		if (process.env.JSON_RPC_URL?.[1])
			return (process.env.JSON_RPC_URL[1]);
		return ('https://rpc.flashbots.net');
	} else if (chain === 4) {
		if (process.env.JSON_RPC_URL?.[4])
			return (process.env.JSON_RPC_URL[4]);
		return `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`;
	} else if (chain === 56) {
		if (process.env.JSON_RPC_URL?.[56])
			return (process.env.JSON_RPC_URL[56]);
		return 'https://bscrpc.com';
	} else if (chain === 100) {
		if (process.env.JSON_RPC_URL?.[100])
			return (process.env.JSON_RPC_URL[100]);
		return 'https://rpc.gnosischain.com';
	} else if (chain === 137) {
		if (process.env.JSON_RPC_URL?.[137])
			return (process.env.JSON_RPC_URL[137]);
		return 'https://polygon-rpc.com';
	} else if (chain === 250) {
		if (process.env.JSON_RPC_URL?.[250])
			return (process.env.JSON_RPC_URL[250]);
		return ('https://rpc.ftm.tools');
	} else if (chain === 1337 || chain === 31337) {
		return ('http://localhost:8545');
	} else if (chain === 42161) {
		if (process.env.JSON_RPC_URL?.[42161])
			return (process.env.JSON_RPC_URL[42161]);
		return ('https://arbitrum.public-rpc.com');
	}
	return ('https://rpc.flashbots.net');
}


/* 🔵 - Yearn Finance ******************************************************
** Connect to the RPC from a specific RPC
**************************************************************************/
export function fromRPC(rpcURI: string): ethers.providers.BaseProvider | ethers.providers.Web3Provider {
	if (rpcURI) {
		return new ethers.providers.JsonRpcProvider(rpcURI);
	}
	return (new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY));
}
