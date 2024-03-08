import {createContext, memo, useContext, useEffect} from 'react';
import {deserialize, serialize} from 'wagmi';
import {toAddress} from '@builtbymom/web3/utils';
import {useLocalStorageValue} from '@react-hookz/web';

import {useFetchYearnEarnedForUser} from '../hooks/useFetchYearnEarnedForUser';
import {useFetchYearnPrices} from '../hooks/useFetchYearnPrices';
import {useFetchYearnTokens} from '../hooks/useFetchYearnTokens';
import {useFetchYearnVaults} from '../hooks/useFetchYearnVaults';
import {Solver} from '../utils/schemas/yDaemonTokenListBalances';
import {useYearnWallet} from './useYearnWallet';

import type {ReactElement} from 'react';
import type {KeyedMutator} from 'swr';
import type {TUseBalancesTokens} from '@builtbymom/web3/hooks/useBalances.multichains';
import type {TAddress, TDict} from '@builtbymom/web3/types';
import type {TYDaemonEarned} from '../utils/schemas/yDaemonEarnedSchema';
import type {TYDaemonPricesChain} from '../utils/schemas/yDaemonPricesSchema';
import type {TSolver} from '../utils/schemas/yDaemonTokenListBalances';
import type {TYDaemonTokens} from '../utils/schemas/yDaemonTokensSchema';
import type {TYDaemonVault, TYDaemonVaults} from '../utils/schemas/yDaemonVaultsSchemas';

export const DEFAULT_SLIPPAGE = 0.5;
export const DEFAULT_MAX_LOSS = 1n;

export type TYearnContext = {
	currentPartner: TAddress;
	earned?: TYDaemonEarned;
	prices?: TYDaemonPricesChain;
	tokens?: TYDaemonTokens;
	vaults: TDict<TYDaemonVault>;
	vaultsMigrations: TDict<TYDaemonVault>;
	vaultsRetired: TDict<TYDaemonVault>;
	isLoadingVaultList: boolean;
	zapSlippage: number;
	maxLoss: bigint;
	zapProvider: TSolver;
	isStakingOpBoostedVaults: boolean;
	mutateVaultList: KeyedMutator<TYDaemonVaults>;
	set_maxLoss: (value: bigint) => void;
	set_zapSlippage: (value: number) => void;
	set_zapProvider: (value: TSolver) => void;
	set_isStakingOpBoostedVaults: (value: boolean) => void;
};

const YearnContext = createContext<TYearnContext>({
	currentPartner: toAddress(process.env.PARTNER_ID_ADDRESS),
	earned: {
		earned: {},
		totalRealizedGainsUSD: 0,
		totalUnrealizedGainsUSD: 0
	},
	prices: {},
	tokens: {},
	vaults: {},
	vaultsMigrations: {},
	vaultsRetired: {},
	isLoadingVaultList: false,
	maxLoss: DEFAULT_MAX_LOSS,
	zapSlippage: 0.1,
	zapProvider: Solver.enum.Cowswap,
	isStakingOpBoostedVaults: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutateVaultList: (): any => undefined,
	set_maxLoss: (): void => undefined,
	set_zapSlippage: (): void => undefined,
	set_zapProvider: (): void => undefined,
	set_isStakingOpBoostedVaults: (): void => undefined
});

export const YearnContextApp = memo(function YearnContextApp({children}: {children: ReactElement}): ReactElement {
	const {onRefresh} = useYearnWallet();
	const {value: maxLoss, set: set_maxLoss} = useLocalStorageValue<bigint>('yearn.fi/max-loss', {
		defaultValue: DEFAULT_MAX_LOSS,
		parse: (str, fallback): bigint => (str ? deserialize(str) : fallback ?? DEFAULT_MAX_LOSS),
		stringify: (data: bigint): string => serialize(data)
	});
	const {value: zapSlippage, set: set_zapSlippage} = useLocalStorageValue<number>('yearn.fi/zap-slippage', {
		defaultValue: DEFAULT_SLIPPAGE
	});
	const {value: zapProvider, set: set_zapProvider} = useLocalStorageValue<TSolver>('yearn.fi/zap-provider', {
		defaultValue: Solver.enum.Cowswap
	});
	const {value: isStakingOpBoostedVaults, set: set_isStakingOpBoostedVaults} = useLocalStorageValue<boolean>(
		'yearn.fi/staking-op-boosted-vaults',
		{
			defaultValue: true
		}
	);

	const prices = useFetchYearnPrices();
	const tokens = useFetchYearnTokens();
	const earned = useFetchYearnEarnedForUser();
	const {vaults, vaultsMigrations, vaultsRetired, isLoading, mutate} = useFetchYearnVaults();

	useEffect(() => {
		const tokensToRefresh: TUseBalancesTokens[] = [];
		for (const [chainID, tokensData] of Object.entries(tokens)) {
			if (tokensData) {
				for (const [address, token] of Object.entries(tokensData)) {
					if (token) {
						tokensToRefresh.push({address: toAddress(address), chainID: Number(chainID)});
					}
				}
			}
		}

		onRefresh(tokensToRefresh);
	}, [tokens, onRefresh]);

	return (
		<YearnContext.Provider
			value={{
				currentPartner: toAddress(process.env.PARTNER_ID_ADDRESS),
				prices,
				tokens,
				earned,
				zapSlippage: zapSlippage ?? DEFAULT_SLIPPAGE,
				maxLoss: maxLoss ?? DEFAULT_MAX_LOSS,
				zapProvider: zapProvider ?? Solver.enum.Cowswap,
				isStakingOpBoostedVaults: isStakingOpBoostedVaults ?? true,
				set_zapSlippage,
				set_maxLoss,
				set_zapProvider,
				set_isStakingOpBoostedVaults,
				vaults,
				vaultsMigrations,
				vaultsRetired,
				isLoadingVaultList: isLoading,
				mutateVaultList: mutate
			}}>
			{children}
		</YearnContext.Provider>
	);
});

export const useYearn = (): TYearnContext => useContext(YearnContext);
