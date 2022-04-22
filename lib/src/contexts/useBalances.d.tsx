import {ethers} from 'ethers';

export type TListTokens = [
	address: string,
	decimals: number,
	chainID: number
]

export type	TBalanceElement = {
	[address: string]: string | ethers.BigNumber
}

export type	TBalancesContext = {
	balancesOf: TBalanceElement,
	rawBalancesOf: TBalanceElement,
	retrieveBalances: (tokensForChain: TListTokens[]) => void
}