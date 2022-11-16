import	React, {ReactElement}					from	'react';
import	{Web3ReactHooks, Web3ReactProvider}		from	'@web3-react/core';
import	{SettingsContextApp}					from	'@yearn-finance/web-lib/contexts/useSettings';
import	{UIContextApp}							from	'@yearn-finance/web-lib/contexts/useUI';
import	{Web3ContextApp}						from	'@yearn-finance/web-lib/contexts/useWeb3';
import	{connectors}							from	'@yearn-finance/web-lib/utils/connectors';

import type {TSettingsBase, TSettingsOptions, TUIOptions, TWeb3Options} from './types';

import	type {Connector}						from	'@web3-react/types';

function	WithYearn({children, options}: {
	children: ReactElement
	options?: {
		ui?: TUIOptions,
		web3?: TWeb3Options,
		networks?: TSettingsOptions,
		baseSettings?: TSettingsBase,
	}
}): ReactElement {
	const web3Connectors: [Connector, Web3ReactHooks][] = [
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
