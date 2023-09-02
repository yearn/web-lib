import React from 'react';

import type {ReactElement} from 'react';
import type {Chain} from 'viem';
import { TUIOptions, TWeb3Options, TSettingsBase } from '../types/contexts';
import { SettingsContextApp } from './useSettings';
import { UIContextApp } from './useUI';
import { Web3ContextApp } from './useWeb3';

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
