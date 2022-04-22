export type TListTokens = [
	address: string,
	decimals: number,
	chainID: number
]

export type	TBalanceElement = {
	[address: string]: string
}

export type	TBalancesContext = {
	balancesOf: TBalanceElement,
	retrieveBalances: (tokensForChain: TListTokens[]) => void
}
