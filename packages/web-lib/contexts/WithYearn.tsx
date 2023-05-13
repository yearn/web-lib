import	React					from	'react';
import	{Web3ReactProvider}		from	'@web3-react/core';
import	{SettingsContextApp}	from	'@yearn-finance/web-lib/contexts/useSettings';
import	{UIContextApp}			from	'@yearn-finance/web-lib/contexts/useUI';
import	{Web3ContextApp}		from	'@yearn-finance/web-lib/contexts/useWeb3';
import	{connectors}			from	'@yearn-finance/web-lib/utils/web3/connectors';

import type {ReactElement} from 'react';
import type {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import type {Web3ReactHooks} from '@web3-react/core';
import type {EIP1193} from '@web3-react/eip1193';
import type {GnosisSafe} from '@web3-react/gnosis-safe';
import type {MetaMask} from '@web3-react/metamask';
import type {WalletConnect} from '@web3-react/walletconnect';
import type {Frame} from '../utils/web3/connectors.frame';
import type {TSettingsBase, TSettingsOptions, TUIOptions, TWeb3Options} from './types';

function	WithYearn({children, options}: {
	children: ReactElement
	options?: {
		ui?: TUIOptions,
		web3?: TWeb3Options,
		networks?: TSettingsOptions,
		baseSettings?: Partial<TSettingsBase>,
	}
}): ReactElement {
	type TConnectors = MetaMask | WalletConnect | CoinbaseWallet | GnosisSafe | Frame | (EIP1193 & any);
	const web3Connectors: [TConnectors, Web3ReactHooks][] = [
		[connectors.frame.connector, connectors.frame.hooks],
		[connectors.metamask.connector, connectors.metamask.hooks],
		[connectors.walletConnect.connector, connectors.walletConnect.hooks],
		[connectors.eip1193.connector, connectors.eip1193.hooks],
		[connectors.gnosisSafe.connector, connectors.gnosisSafe.hooks],
		[connectors.coinbase.connector, connectors.coinbase.hooks]
	];

	return (
		<UIContextApp options={options?.ui}>
			<SettingsContextApp
				networksOptions={options?.networks}
				baseOptions={options?.baseSettings}>
				<Web3ReactProvider connectors={web3Connectors} lookupENS={false}>
					<Web3ContextApp options={options?.web3}>
						{children}
					</Web3ContextApp>
				</Web3ReactProvider>
			</SettingsContextApp>
		</UIContextApp>
	);
}

export {WithYearn};
