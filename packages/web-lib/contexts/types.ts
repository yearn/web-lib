import	{ReactNode}	from 'react';
import	{ethers}	from 'ethers';

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
	onUpdateNetworks: (newNetworkSettings: TSettingsOptions) => void,
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

export type TUIOptions = {
	shouldUseDefaultToaster?: boolean,
	shouldUseThemes?: boolean
}

export type TPossibleThemes = 'dark' | 'light';

export type	TUIContext = {
	theme: string,
	switchTheme: () => void,
	toast: unknown
}

export type TWeb3Options = {
	shouldUseWallets?: boolean,
	defaultChainID?: number,
	supportedChainID?: number[]
}

export type TWeb3Context = {
	address: string | null | undefined,
	ens: string | undefined,
	chainID: number,
	safeChainID: number,
	isDisconnected: boolean,
	isActive: boolean,
	isConnecting: boolean,
	hasProvider: boolean,
	provider: ethers.providers.Provider,
	onConnect: (p: number, e?: ((error: Error) => void) | undefined, s?: (() => void) | undefined) => Promise<void>,
	onSwitchChain: (newChainID: number, force?: boolean) => void,
	openLoginModal: () => void,
	onDesactivate: () => void,
	options?: TWeb3Options
}
