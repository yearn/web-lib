import {useFetch} from '@builtbymom/web3/hooks/useFetch';
import {toAddress} from '@builtbymom/web3/utils';
import {useDeepCompareMemo} from '@react-hookz/web';

import {useYDaemonBaseURI} from '../hooks/useYDaemonBaseURI';
import {yDaemonVaultsSchema} from '../utils/schemas/yDaemonVaultsSchemas';

import type {KeyedMutator} from 'swr';
import type {TDict} from '@builtbymom/web3/types';
import type {TYDaemonVault, TYDaemonVaults} from '../utils/schemas/yDaemonVaultsSchemas';

function useYearnVaults(): {
	vaults: TDict<TYDaemonVault>;
	vaultsMigrations: TDict<TYDaemonVault>;
	vaultsRetired: TDict<TYDaemonVault>;
	isLoading: boolean;
	mutate: KeyedMutator<TYDaemonVaults>;
} {
	const {yDaemonBaseUri: yDaemonBaseUriWithoutChain} = useYDaemonBaseURI();

	const {
		data: vaults,
		isLoading,
		mutate
	} = useFetch<TYDaemonVaults>({
		endpoint: `${yDaemonBaseUriWithoutChain}/vaults?${new URLSearchParams({
			hideAlways: 'true',
			orderBy: 'featuringScore',
			orderDirection: 'desc',
			strategiesDetails: 'withDetails',
			strategiesRisk: 'withRisk',
			strategiesCondition: 'inQueue',
			chainIDs: [1, 10, 137, 250, 8453, 42161].join(','),
			limit: '2500'
		})}`,
		schema: yDaemonVaultsSchema
	});

	const {data: vaultsMigrations} = useFetch<TYDaemonVaults>({
		endpoint: `${yDaemonBaseUriWithoutChain}/vaults?${new URLSearchParams({
			migratable: 'nodust'
		})}`,
		schema: yDaemonVaultsSchema
	});

	const {data: vaultsRetired} = useFetch<TYDaemonVaults>({
		endpoint: `${yDaemonBaseUriWithoutChain}/vaults/retired`,
		schema: yDaemonVaultsSchema
	});

	const vaultsObject = useDeepCompareMemo((): TDict<TYDaemonVault> => {
		const _vaultsObject = (vaults ?? []).reduce((acc: TDict<TYDaemonVault>, vault): TDict<TYDaemonVault> => {
			if (!vault.migration.available) {
				acc[toAddress(vault.address)] = vault;
			}
			return acc;
		}, {});
		return _vaultsObject;
	}, [vaults]);

	const vaultsMigrationsObject = useDeepCompareMemo((): TDict<TYDaemonVault> => {
		const _migratableVaultsObject = (vaultsMigrations ?? []).reduce(
			(acc: TDict<TYDaemonVault>, vault): TDict<TYDaemonVault> => {
				if (toAddress(vault.address) !== toAddress(vault.migration.address)) {
					acc[toAddress(vault.address)] = vault;
				}
				return acc;
			},
			{}
		);
		return _migratableVaultsObject;
	}, [vaultsMigrations]);

	const vaultsRetiredObject = useDeepCompareMemo((): TDict<TYDaemonVault> => {
		const _retiredVaultsObject = (vaultsRetired ?? []).reduce(
			(acc: TDict<TYDaemonVault>, vault): TDict<TYDaemonVault> => {
				acc[toAddress(vault.address)] = vault;
				return acc;
			},
			{}
		);
		return _retiredVaultsObject;
	}, [vaultsRetired]);

	return {
		vaults: vaultsObject,
		vaultsMigrations: vaultsMigrationsObject,
		vaultsRetired: vaultsRetiredObject,
		isLoading,
		mutate
	};
}

export {useYearnVaults};
