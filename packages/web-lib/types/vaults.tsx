import type {TAddress} from '@yearn-finance/web-lib/types';

export type TStrategyDetails = {
	keeper: TAddress,
	strategist: TAddress,
	rewards: TAddress,
	healthCheck: TAddress,
	totalDebt: string,
	totalLoss: string,
	totalGain: string,
	minDebtPerHarvest: string,
	maxDebtPerHarvest: string,
	estimatedTotalAssets: string,
	creditAvailable: string,
	debtOutstanding: string,
	expectedReturn: string,
	delegatedAssets: string,
	delegatedValue: string,
	protocols: string[],
	version: string,
	apr: number,
	performanceFee: number,
	lastReport: number,
	activation: number,
	keepCRV: number,
	debtRatio: number,
	debtLimit: number,
	withdrawalQueuePosition: number,
	doHealthCheck: boolean,
	inQueue: boolean,
	emergencyExit: boolean,
	isActive: boolean,
}
export type TStrategyRisk = {
	riskGroup: string,
	riskDetails: {
		TVLImpact: number,
		auditScore: number,
		codeReviewScore: number,
		complexityScore: number,
		longevityImpact: number,
		protocolSafetyScore: number,
		teamKnowledgeScore: number,
		testingScore: number,
	}
}
export type TStrategy = {
	address: TAddress,
	name: string,
	description: string,
	details: TStrategyDetails,
	risk: TStrategyRisk
}
export type TVaultToken = {
	address: TAddress,
	underlyingTokensAddresses: TAddress[],
	name: string,
	display_name: string,
	symbol: string,
	description: string,
	decimals: number,
	icon: string,
}
export type TVaultTVL = {
	total_assets: string,
	tvl: number,
	price: number
}
export type TVaultAPY = {
	type: string,
	gross_apr: number,
	net_apy: number,
	fees: {
		performance: number,
		withdrawal: number,
		management: number,
		keep_crv: number,
		cvx_keep_crv: number
	},
	points: {
		week_ago: number,
		month_ago: number,
		inception: number,
	},
	composite: {
		boost: number,
		pool_apy: number,
		boosted_apr: number,
		base_apr: number,
		cvx_apr: number,
		rewards_apr: number
	}
}
export type TVaultDetails = {
	management: TAddress,
	governance: TAddress,
	guardian: TAddress,
	rewards: TAddress,
	depositLimit: string,
	comment: string,
	apyTypeOverride: string,
	apyOverride: number,
	performanceFee: number,
	managementFee: number,
	depositsDisabled: boolean,
	withdrawalsDisabled: boolean,
	allowZapIn: boolean,
	allowZapOut: boolean,
	retired: boolean
}
export type TVault = {
	inception: number,
	address: TAddress,
	symbol: string,
	display_symbol: string,
	formated_symbol: string,
	name: string,
	display_name: string,
	formated_name: string,
	icon: string,
	category: string,
	riskScore: number,
	chainID: number,
	token: TVaultToken,
	tvl: TVaultTVL,
	apy: TVaultAPY,
	strategies: TStrategy[],
	details: TVaultDetails,
	endorsed: boolean,
	version: string,
	decimals: number,
	type: string,
	emergency_shutdown: boolean,
	updated: number,
	migration: {
		available: boolean,
		address: TAddress,
		contract: TAddress,
	}
}
export type TCurrentVault = {currentVault: TVault};
