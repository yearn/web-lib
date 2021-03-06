import	{Web3ReactHooks, initializeConnector}	from	'@web3-react/core';
import	{MetaMask}								from	'@web3-react/metamask';
import	{WalletConnect}							from	'@web3-react/walletconnect';
import	{GnosisSafe}							from	'@web3-react/gnosis-safe';
import	{CoinbaseWallet}						from	'@web3-react/coinbase-wallet';
import	{EIP1193}								from	'./connectors.eip1193';
import	{getRPC}							from	'./providers';

const	[metaMaskConnector, metaMaskHooks] = initializeConnector<MetaMask | any>((actions): MetaMask => new MetaMask(
	actions,
	false
));

const	[walletConnectConnector, walletConnectHooks] = initializeConnector<WalletConnect | any>((actions): WalletConnect => new WalletConnect(
	actions,
	{
		rpc: {
			1: getRPC(1),
			4: getRPC(4),
			250: getRPC(250),
			1337: getRPC(1337),
			31337: getRPC(31337)
		}
	},
	false
));

const	[eip1193Connector, eip1193Hooks] = initializeConnector<EIP1193 | any>((actions): EIP1193 => new EIP1193(
	actions,
	null as any
));

const	[gnosisSafeConnector, gnosisSafeHooks] = initializeConnector<GnosisSafe | any>((actions): GnosisSafe => new GnosisSafe(
	actions,
	false,
	{allowedDomains: [/gnosis-safe.io/]}
));

const	[coinbaseConnector, coinbaseHooks] = initializeConnector<CoinbaseWallet | any>((actions): CoinbaseWallet => new CoinbaseWallet(actions, {
	url: getRPC(1),
	appName: process.env.WEBSITE_TITLE as string
})
);

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
		hooks: metaMaskHooks
	},
	walletConnect: {
		connector: walletConnectConnector,
		hooks: walletConnectHooks
	},
	eip1193: {
		connector: eip1193Connector,
		hooks: eip1193Hooks
	},
	gnosisSafe: {
		connector: gnosisSafeConnector,
		hooks: gnosisSafeHooks
	},
	coinbase: {
		connector: coinbaseConnector,
		hooks: coinbaseHooks
	}
};