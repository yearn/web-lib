import React from 'react';
import {RainbowKitProvider} from '@rainbow-me/rainbowkit';

import {SettingsContextApp} from './useSettings';
import {UIContextApp} from './useUI';
import {Web3ContextApp} from './useWeb3';

import type {ReactElement} from 'react';
import type {Chain} from 'viem';
import type {TSettingsBase,TUIOptions, TWeb3Options} from '../types/contexts.js';

import '@rainbow-me/rainbowkit/styles.css';

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
					<RainbowKitProvider chains={supportedChains}>
						{children}
					</RainbowKitProvider>
				</Web3ContextApp>
			</SettingsContextApp>
		</UIContextApp>
	);
}

export {WithYearn};
