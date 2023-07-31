import React from 'react';
import {SettingsContextApp} from '@yearn-finance/web-lib/contexts/useSettings';
import {UIContextApp} from '@yearn-finance/web-lib/contexts/useUI';
import {Web3ContextApp} from '@yearn-finance/web-lib/contexts/useWeb3';

import type {ReactElement} from 'react';
import type {Chain} from 'viem';
import type {TSettingsBase, TUIOptions, TWeb3Options} from '@yearn-finance/web-lib/types/contexts';

function	WithYearn({children, supportedChains, options}: {
	children: ReactElement
	supportedChains: Chain[],
	options?: {
		ui?: TUIOptions,
		web3?: TWeb3Options,
		baseSettings?: Partial<TSettingsBase>,
	}
}): ReactElement {
	return (
		<UIContextApp options={options?.ui}>
			<SettingsContextApp baseOptions={options?.baseSettings}>
				<Web3ContextApp
					supportedChains={supportedChains}
					options={options?.web3}>
					{children}
				</Web3ContextApp>
			</SettingsContextApp>
		</UIContextApp>
	);
}

export {WithYearn};
