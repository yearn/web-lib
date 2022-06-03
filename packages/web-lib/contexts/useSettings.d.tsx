import {ReactNode} from 'react';

export type	TSettingsForNetwork = {
	rpcURI?: string,
	graphURI?: string,
	metaURI?: string,
	apiURI?: string,
	lensAddress?: string,
}

export type	TSettingsContext = {
	networks: {
		[key: number]: TSettingsForNetwork,
	},
	onUpdateNetworks: (newNetworkSettings: TSettingsContext) => void,
}

export type TSettingsOptions = {
	[key: number]: TSettingsForNetwork,
}

export type	TSettingsContextApp = {
	children: ReactNode,
	options?: TSettingsOptions,
}