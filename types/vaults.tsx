import {toAddress} from '../utils/address';
import {toBigInt} from '../utils/format.bigNumber';

import type {TAddress} from '@yearn-finance/web-lib/types';

export type TStrategyDetails = {
	keeper: TAddress,
	strategist: TAddress,
	rewards: TAddress,
	healthCheck: TAddress,
	totalDebt: bigint,
	totalLoss: bigint,
	totalGain: bigint,
	minDebtPerHarvest: bigint,
	maxDebtPerHarvest: bigint,
	estimatedTotalAssets: bigint,
	creditAvailable: bigint,
	debtOutstanding: bigint,
	expectedReturn: bigint,
	delegatedAssets: bigint,
	delegatedValue: number,
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
	displayName: string,
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
	icon: string,
	decimals: bigint,
}
export type TVaultTVL = {
	total_assets: bigint,
	total_delegated_assets: bigint,
	tvl_deposited: number,
	tvl_delegated: number,
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
	depositLimit: bigint,
	availableDepositLimit: bigint,
	comment: string,
	apyTypeOverride: string,
	apyOverride: number,
	performanceFee: number,
	managementFee: number,
	depositsDisabled: boolean,
	withdrawalsDisabled: boolean,
	allowZapIn: boolean,
	allowZapOut: boolean,
	retired: boolean,
	hideAlways: boolean,
}
export type TVault = {
	address: TAddress,
	type: string,
	name: string,
	display_name: string,
	formated_name: string,
	symbol: string,
	display_symbol: string,
	formated_symbol: string,
	icon: string,
	version: string,
	category: string,
	decimals: bigint,
	inception: number,
	riskScore: number,
	chainID: number,
	updated: number,
	endorsed: boolean,
	emergency_shutdown: boolean,
	token: TVaultToken,
	tvl: TVaultTVL,
	apy: TVaultAPY,
	strategies: TStrategy[],
	details: TVaultDetails,
	migration: {
		available: boolean,
		address: TAddress,
		contract: TAddress,
	}
}
export type TCurrentVault = {currentVault: TVault};

export function handleRawTVaut(vault: TVault): TVault {
	//The TAddress are returned as strings, we need to convert them to TAddress
	vault.address = toAddress(vault.address);
	vault.token.address = toAddress(vault.token.address);
	vault.token.underlyingTokensAddresses = vault.token.underlyingTokensAddresses.map(toAddress);
	vault.details.management = toAddress(vault.details.management);
	vault.details.governance = toAddress(vault.details.governance);
	vault.details.guardian = toAddress(vault.details.guardian);
	vault.details.rewards = toAddress(vault.details.rewards);
	vault.strategies = vault.strategies.map((strategy): TStrategy => {
		strategy.address = toAddress(strategy.address);
		if (strategy.details) {
			strategy.details.keeper = toAddress(strategy.details.keeper);
			strategy.details.strategist = toAddress(strategy.details.strategist);
			strategy.details.rewards = toAddress(strategy.details.rewards);
			strategy.details.healthCheck = toAddress(strategy.details.healthCheck);

			strategy.details.totalDebt = toBigInt(strategy.details.totalDebt, 'strategy.details.totalDebt');
			strategy.details.totalLoss = toBigInt(strategy.details.totalLoss, 'strategy.details.totalLoss');
			strategy.details.totalGain = toBigInt(strategy.details.totalGain, 'strategy.details.totalGain');
			strategy.details.minDebtPerHarvest = toBigInt(strategy.details.minDebtPerHarvest, 'strategy.details.minDebtPerHarvest');
			strategy.details.maxDebtPerHarvest = toBigInt(strategy.details.maxDebtPerHarvest, 'strategy.details.maxDebtPerHarvest');
			strategy.details.estimatedTotalAssets = toBigInt(strategy.details.estimatedTotalAssets, 'strategy.details.estimatedTotalAssets');
			strategy.details.creditAvailable = toBigInt(strategy.details.creditAvailable, 'strategy.details.creditAvailable');
			strategy.details.debtOutstanding = toBigInt(strategy.details.debtOutstanding, 'strategy.details.debtOutstanding');
			strategy.details.expectedReturn = toBigInt(strategy.details.expectedReturn, 'strategy.details.expectedReturn');
			strategy.details.delegatedAssets = toBigInt(strategy.details.delegatedAssets, 'strategy.details.delegatedAssets');
		}
		return strategy;
	});
	vault.migration.address = toAddress(vault.migration.address);
	vault.migration.contract = toAddress(vault.migration.contract);

	//The bigint are returned as strings, we need to convert them to bigint
	vault.decimals = toBigInt(vault.decimals, 'vault.decimals');
	vault.token.decimals = toBigInt(vault.token.decimals, 'vault.token.decimals');
	vault.details.depositLimit = toBigInt(vault.details.depositLimit, 'vault.details.depositLimit');
	vault.details.availableDepositLimit = toBigInt(vault.details.availableDepositLimit, 'vault.details.availableDepositLimit');
	vault.tvl.total_assets = toBigInt(vault.tvl.total_assets, 'vault.tvl.total_assets');
	vault.tvl.total_delegated_assets = toBigInt(vault.tvl.total_delegated_assets, 'vault.tvl.total_delegated_assets');
	return vault;
}
