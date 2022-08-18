import {ReactNode} from 'react';

export type TSettingsBase = {
	yDaemonBaseURI: string,
	metaBaseURI: string,
	apiBaseURI: string,
}
export type	TSettingsForNetwork = {
	rpcURI?: string,
	yDaemonURI?: string,
	graphURI?: string,
	metaURI?: string,
	apiURI?: string,
	explorerBaseURI?: string,
	lensAddress?: string,
	partnerContractAddress?: string
}

export type	TSettingsContext = {
	settings: TSettingsBase,
	networks: {
		[key: number]: TSettingsForNetwork,
	},
	onUpdateNetworks: (newNetworkSettings: TSettingsContext) => void,
	onUpdateBaseSettings: (newBaseSettings: TSettingsBase) => void,
}

export type TSettingsOptions = {
	[key: number]: TSettingsForNetwork,
}

export type	TSettingsContextApp = {
	children: ReactNode,
	networksOptions?: TSettingsOptions,
	baseOptions?: TSettingsBase,
}