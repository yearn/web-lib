import type	{ReactNode}	from 'react';
import type {Connector} from 'wagmi';
import type {TPartnersInfo} from '../utils/partners.js';
import type {TAddress} from './index.js';

export type TSettingsBase = {
	yDaemonBaseURI: string,
	metaBaseURI: string,
	apiBaseURI: string,
}
export type	TSettingsContext = {
	settings: TSettingsBase,
	onUpdateBaseSettings: (newBaseSettings: TSettingsBase) => void,
}

export type	TSettingsContextApp = {
	children: ReactNode,
	baseOptions?: Partial<TSettingsBase>,
}

export type TUIOptions = {
	shouldUseDefaultToaster?: boolean,
	shouldUseThemes?: boolean
}

export type TPossibleThemes = 'dark' | 'light';

export type	TUIContext = {
	toast: unknown,
	onLoadStart: () => void,
	onLoadDone: () => void,
}

export type TWeb3Options = {
	shouldUseWallets?: boolean,
	defaultChainID?: number
}

export type TWeb3Context = {
	address: TAddress | undefined,
	ens: string | undefined,
	lensProtocolHandle: string | undefined,
	chainID: number,
	isDisconnected: boolean,
	isActive: boolean
	isConnecting: boolean,
	hasProvider: boolean,
	provider?: Connector,
	currentPartner?: TPartnersInfo,
	onConnect: (p: string, e?: ((error: Error) => void) | undefined, s?: (() => void) | undefined) => Promise<void>,
	onSwitchChain: (newChainID: number) => void,
	openLoginModal: () => void,
	onDesactivate: () => void,
	options?: TWeb3Options,
	walletType: string,
}
