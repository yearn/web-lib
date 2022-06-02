import	{ethers}	from	'ethers';

export type TWeb3Options = {
	shouldUseStrictChainMode: boolean,
	defaultChainID: number,
	supportedChainID: number[]
}

export type TWeb3Context = {
	address: string | null | undefined,
	ens: string | undefined,
	chainID: number,
	isDisconnected: boolean,
	isActive: boolean,
	hasProvider: boolean,
	provider: ethers.providers.Provider,
	onConnect: (p: number, e?: ((error: Error) => void) | undefined, s?: (() => void) | undefined) => Promise<void>,
	onSwitchChain: (newChainID: number, force?: boolean) => void,
	openLoginModal: () => void,
	onDesactivate: () => void,
}