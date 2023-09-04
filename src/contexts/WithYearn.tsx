import React from 'react';

import {SettingsContextApp} from './useSettings.js';
import {UIContextApp} from './useUI.js';
import {Web3ContextApp} from './useWeb3.js';

import type {ReactElement} from 'react';
import type {Chain} from 'viem';
import type {TSettingsBase,TUIOptions, TWeb3Options} from '../types/contexts.js';

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
				<Web3ContextApp supportedChains={supportedChains} options={options?.web3}>
					{children}
				</Web3ContextApp>
			</SettingsContextApp>
		</UIContextApp>
	);
}

export {WithYearn};
