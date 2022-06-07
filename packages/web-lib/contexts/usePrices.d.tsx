export type TPriceElement = {
	[index: string]: {
		'usd': string,
		'eth'?: string
	}
}
export type TPricesContext = {
	prices: TPriceElement
}
