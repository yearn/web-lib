import	{Web3ReactHooks, initializeConnector}	from	'@web3-react/core';
import	{MetaMask}								from	'@web3-react/metamask';
import	{WalletConnect}							from	'@web3-react/walletconnect';
import	{GnosisSafe}							from	'@web3-react/gnosis-safe';
import	{CoinbaseWallet}						from	'@web3-react/coinbase-wallet'
import	{EIP1193}								from	'./connectors.eip1193';

const	[metaMaskConnector, metaMaskHooks] = initializeConnector<MetaMask | any>((actions) => new MetaMask(actions));
const	[walletConnectConnector, walletConnectHooks] = initializeConnector<WalletConnect | any>((actions) => (
	new WalletConnect(actions, {
		rpc: {
			1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
			4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
			250: 'https://rpc.ftm.tools',
			1337: 'http://localhost:8545',
			31337: 'http://localhost:8545'
		}
	}))
);
const	[eip1193Connector, eip1193Hooks] = initializeConnector<EIP1193 | any>((actions) => new EIP1193(
	actions,
	null as any
));

const	[gnosisSafeConnector, gnosisSafeHooks] = initializeConnector<GnosisSafe | any>((actions) => new GnosisSafe(
	actions,
	false,
	{allowedDomains: [/gnosis-safe.io/]}
));

const	[coinbaseConnector, coinbaseHooks] = initializeConnector<CoinbaseWallet | any>((actions) => new CoinbaseWallet(actions, {
		url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
		appName: 'Yearn.finance',
	})
)


export type TConnector = {
	metamask: {connector: MetaMask; hooks: Web3ReactHooks;},
	walletConnect: {connector: WalletConnect; hooks: Web3ReactHooks;},
	eip1193: {connector: EIP1193; hooks: Web3ReactHooks;}
	gnosisSafe: {connector: GnosisSafe; hooks: Web3ReactHooks;}
	coinbase: {connector: CoinbaseWallet; hooks: Web3ReactHooks;}
}
export const connectors: TConnector = {
	metamask: {
		connector: metaMaskConnector,
		hooks: metaMaskHooks,
	},
	walletConnect: {
		connector: walletConnectConnector,
		hooks: walletConnectHooks,
	},
	eip1193: {
		connector: eip1193Connector,
		hooks: eip1193Hooks,
	},
	gnosisSafe: {
		connector: gnosisSafeConnector,
		hooks: gnosisSafeHooks,
	},
	coinbase: {
		connector: coinbaseConnector,
		hooks: coinbaseHooks,
	}
}