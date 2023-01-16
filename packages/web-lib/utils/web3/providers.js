import { Provider } from 'ethcall';
import { ethers } from 'ethers';
const defaultRPCURI = {
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
export const envRPCURI = {
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
export function replaceEnvRPCURI(key, value) {
    envRPCURI[key] = value;
}
export async function newEthCallProvider(provider) {
    const ethcallProvider = new Provider();
    const network = await provider.getNetwork();
    if (process.env.IS_TEST) {
        await ethcallProvider.init(new ethers.providers.JsonRpcProvider(defaultRPCURI[1337]));
        if (Number(process.env.TESTED_NETWORK) === 250) {
            ethcallProvider.multicall = { address: '0xc04d660976c923ddba750341fe5923e47900cf24', block: 0 };
            ethcallProvider.multicall2 = { address: '0x470ADB45f5a9ac3550bcFFaD9D990Bf7e2e941c9', block: 0 };
        }
        else {
            ethcallProvider.multicall = { address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441', block: 0 };
            ethcallProvider.multicall2 = { address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696', block: 0 };
        }
        return ethcallProvider;
    }
    await ethcallProvider.init(provider);
    if (network.chainId === 420) {
        ethcallProvider.multicall2 = { address: '0xcA11bde05977b3631167028862bE2a173976CA11', block: 0 };
        ethcallProvider.multicall3 = { address: '0xcA11bde05977b3631167028862bE2a173976CA11', block: 0 };
    }
    ethcallProvider.multicall = null;
    return ethcallProvider;
}
export function getProvider(chain = 1) {
    if (envRPCURI?.[chain]) {
        return new ethers.providers.JsonRpcProvider(envRPCURI?.[chain]);
    }
    if (process.env.WEB_SOCKET_URL?.[chain]) {
        return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[chain]);
    }
    if (process.env.ALCHEMY_KEY && chain === 1) {
        return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
    }
    if (process.env.INFURA_KEY && chain === 1) {
        return new ethers.providers.InfuraProvider('homestead', process.env.INFURA_KEY);
    }
    if (defaultRPCURI?.[chain]) {
        return new ethers.providers.JsonRpcProvider(defaultRPCURI[chain]);
    }
    if (envRPCURI?.[1]) {
        return new ethers.providers.JsonRpcProvider(envRPCURI?.[1]);
    }
    if (process.env.WEB_SOCKET_URL?.[1]) {
        return new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET_URL?.[1]);
    }
    if (process.env.ALCHEMY_KEY) {
        return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
    }
    if (process.env.INFURA_KEY) {
        return new ethers.providers.InfuraProvider('homestead', process.env.INFURA_KEY);
    }
    return new ethers.providers.JsonRpcProvider(defaultRPCURI?.[1] || '');
}
export function getRPC(chainID = 1) {
    if (process.env.JSON_RPC_URL?.[chainID]) {
        return (process.env.JSON_RPC_URL[chainID]);
    }
    if (defaultRPCURI?.[chainID]) {
        return defaultRPCURI?.[chainID];
    }
    return (defaultRPCURI[1]);
}
export function fromRPC(rpcURI) {
    if (rpcURI) {
        return new ethers.providers.JsonRpcProvider(rpcURI);
    }
    return (new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY));
}
