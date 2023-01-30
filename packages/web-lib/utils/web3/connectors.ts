import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {initializeConnector} from '@web3-react/core';
import {GnosisSafe} from '@web3-react/gnosis-safe';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';
import {EIP1193} from '@yearn-finance/web-lib/utils/web3/connectors.eip1193';
import {getRPC} from '@yearn-finance/web-lib/utils/web3/providers';

import {Frame} from './connectors.frame';

import type {Web3ReactHooks} from '@web3-react/core';
import type {TActions} from './connectors.frame';

const	[metaMaskConnector, metaMaskHooks] = initializeConnector<MetaMask>(
	(actions): MetaMask => new MetaMask({actions})
);

const	[frameConnector, frameHooks] = initializeConnector<Frame>(
	(actions): Frame => new Frame(actions as unknown as TActions)
);

const	[walletConnectConnector, walletConnectHooks] = initializeConnector<WalletConnect>(
	(actions): WalletConnect =>
		new WalletConnect({
			actions,
			options: {
				rpc: {
					1: getRPC(1),
					4: getRPC(4),
					10: getRPC(10),
					250: getRPC(250),
					420: getRPC(420),
					1337: getRPC(1337),
					31337: getRPC(31337)
				}
			}
		})
);

const	[eip1193Connector, eip1193Hooks] = initializeConnector<EIP1193>(
	(actions): EIP1193 => new EIP1193({
		actions,
		provider: undefined
	})
);

const	[gnosisSafeConnector, gnosisSafeHooks] = initializeConnector<GnosisSafe>(
	(actions): GnosisSafe => new GnosisSafe({
		actions,
		options: {allowedDomains: [/gnosis-safe.io/, /app.safe.global/]}
	})
);

const [coinbaseConnector, coinbaseHooks] = initializeConnector<CoinbaseWallet>(
	(actions): CoinbaseWallet =>
		new CoinbaseWallet({
			actions,
			options: {
				url: getRPC(1),
				appName: process.env.WEBSITE_TITLE as string
			}
		})
);

export type TConnector = {
	metamask: {connector: MetaMask; hooks: Web3ReactHooks;},
	frame: {connector: Frame; hooks: Web3ReactHooks;},
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
	frame: {
		connector: frameConnector,
		hooks: frameHooks
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
