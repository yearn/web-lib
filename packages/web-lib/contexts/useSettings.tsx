import	React, {createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {zeroAddress} from 'viem';
import	{deepMerge} from '@yearn-finance/web-lib/contexts/utils';
import	{useLocalStorage} from '@yearn-finance/web-lib/hooks/useLocalStorage';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import	performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import	{getRPC, replaceEnvRPCURI} from '@yearn-finance/web-lib/utils/web3/providers';

import type {TSettingsBase, TSettingsBaseOptions, TSettingsContext, TSettingsContextApp, TSettingsOptions} from '@yearn-finance/web-lib/types/contexts';

const	defaultSettings = {
	yDaemonBaseURI: 'https://ydaemon.ycorpo.com',
	metaBaseURI: 'https://meta.yearn.finance',
	apiBaseURI: 'https://api.yearn.finance'
};
const	defaultNetworks = {
	1: {
		rpcURI: getRPC(1),
		graphURI: 'https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-subgraph-mainnet',
		yDaemonURI: `${defaultSettings.yDaemonBaseURI}/1`,
		metaURI: `${defaultSettings.metaBaseURI}/api/1`,
		apiURI: `${defaultSettings.apiBaseURI}/v1/chains/1`,
		explorerBaseURI: 'https://etherscan.io',
		lensOracleAddress: toAddress('0x83d95e0D5f402511dB06817Aff3f9eA88224B030'),
		partnerContractAddress: toAddress('0x8ee392a4787397126C163Cb9844d7c447da419D8')
	},
	10: {
		rpcURI: getRPC(10),
		graphURI: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-optimism',
		yDaemonURI: `${defaultSettings.yDaemonBaseURI}/10`,
		metaURI: `${defaultSettings.metaBaseURI}/api/10`,
		apiURI: `${defaultSettings.apiBaseURI}/v1/chains/10`,
		explorerBaseURI: 'https://optimistic.etherscan.io',
		lensOracleAddress: toAddress('0xB082d9f4734c535D9d80536F7E87a6f4F471bF65'),
		partnerContractAddress: toAddress(zeroAddress)
	},
	250: {
		rpcURI: getRPC(250),
		graphURI: 'https://api.thegraph.com/subgraphs/name/bsamuels453/yearn-fantom-validation-grafted',
		yDaemonURI: `${defaultSettings.yDaemonBaseURI}/250`,
		metaURI: `${defaultSettings.metaBaseURI}/api/250`,
		apiURI: `${defaultSettings.apiBaseURI}/v1/chains/250`,
		explorerBaseURI: 'https://ftmscan.com',
		lensOracleAddress: toAddress('0x57AA88A0810dfe3f9b71a9b179Dd8bF5F956C46A'),
		partnerContractAddress: toAddress('0x086865B2983320b36C42E48086DaDc786c9Ac73B')
	},
	42161: {
		rpcURI: getRPC(42161),
		graphURI: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-arbitrum',
		yDaemonURI: `${defaultSettings.yDaemonBaseURI}/42161`,
		metaURI: `${defaultSettings.metaBaseURI}/api/42161`,
		apiURI: `${defaultSettings.apiBaseURI}/v1/chains/42161`,
		explorerBaseURI: 'https://arbiscan.io',
		lensOracleAddress: toAddress('0x043518AB266485dC085a1DB095B8d9C2Fc78E9b9'),
		partnerContractAddress: toAddress(zeroAddress)
	},
	1337: {
		rpcURI: getRPC(1337),
		graphURI: 'https://api.thegraph.com/subgraphs/name/0xkofee/yearn-vaults-v2',
		yDaemonURI: `${defaultSettings.yDaemonBaseURI}/1`,
		metaURI: `${defaultSettings.metaBaseURI}/api/1`,
		apiURI: `${defaultSettings.apiBaseURI}/v1/chains/1`,
		explorerBaseURI: 'https://etherscan.io',
		lensOracleAddress: toAddress('0x83d95e0D5f402511dB06817Aff3f9eA88224B030'),
		partnerContractAddress: toAddress('0x8ee392a4787397126C163Cb9844d7c447da419D8')
	}
};

const	SettingsContext = createContext<TSettingsContext>({
	settings: defaultSettings,
	networks: defaultNetworks,
	onUpdateNetworks: (): null => null,
	onUpdateBaseSettings: (): null => null
});

/* 💙 - Yearn Finance *************************************************************************
**	Handle some global parameters for the app. This should be used to store specific elements
**	we want dApps to be able to customize, without being specific to the dApp.
**	One of theses parameters is the list of networks with the specific Yearn's endpoints.
**********************************************************************************************/
export const SettingsContextApp = ({
	children,
	baseOptions = defaultSettings,
	networksOptions = {}
}: TSettingsContextApp): React.ReactElement => {
	const	[baseSettings, set_baseSettings] = useLocalStorage(
		'yearnSettingsBase',
		deepMerge(defaultSettings, baseOptions) as TSettingsBase,
		{currentVersion: 1, shouldMigratePreviousVersion: true}
	);
	const	[networks, set_networks] = useLocalStorage(
		'yearnSettingsNetworks',
		deepMerge(defaultNetworks, networksOptions) as TSettingsBaseOptions & TSettingsOptions,
		{currentVersion: 1, shouldMigratePreviousVersion: true}
	);

	useEffect((): void => {
		const	_networks = networks as TSettingsOptions;
		Object.keys(_networks).forEach((key): void => {
			replaceEnvRPCURI(Number(key), _networks[Number(key)]?.rpcURI || '');
		});
	}, [networks]);

	/* 💙 - Yearn Finance *********************************************************************
	**	The app can provide a new list of networks with their own data. They will be deep
	**	merged with the existing ones, aka the existing declarations will be overwritten but
	**	the new ones will be added.
	******************************************************************************************/
	const onUpdateNetworks = useCallback((newNetworkSettings: TSettingsOptions): void => {
		const	_networks = deepMerge(networks, newNetworkSettings) as TSettingsBaseOptions & TSettingsOptions;
		Object.keys(_networks).forEach((key): void => {
			replaceEnvRPCURI(Number(key), _networks[Number(key)]?.rpcURI || '');
		});
		set_networks(_networks);
	}, [networks]); // eslint-disable-line react-hooks/exhaustive-deps

	/* 💙 - Yearn Finance *********************************************************************
	**	The app can provide a new list of base options. They will be deep merged with the
	**	existing ones, aka the existing declarations will be overwritten but the new ones will
	**	be added. Networks settings are updated accordingly.
	******************************************************************************************/
	const onUpdateBaseSettings = useCallback((newSettings: TSettingsBase): void => {
		performBatchedUpdates((): void => {
			set_baseSettings(newSettings);

			set_networks((prevNetworks): TSettingsBaseOptions & TSettingsOptions => {
				Object.keys(prevNetworks).forEach((key: string | number): void => {
					prevNetworks[Number(key)].yDaemonURI = `${newSettings.yDaemonBaseURI}/${key}`;
					prevNetworks[Number(key)].metaURI = `${newSettings.metaBaseURI}/api/${key}`;
					prevNetworks[Number(key)].apiURI = `${newSettings.apiBaseURI}/v1/chains/${key}`;
				});
				return prevNetworks;
			});
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/* 💙 - Yearn Finance *********************************************************************
	**	Render the SettingContext with it's parameters.
	**	The parameters will be accessible to the children via the useSettings hook.
	******************************************************************************************/
	const	contextValue = useMemo((): TSettingsContext => ({
		settings: baseSettings as TSettingsBase,
		networks: networks,
		onUpdateNetworks: onUpdateNetworks,
		onUpdateBaseSettings: onUpdateBaseSettings
	}), [baseSettings, networks, onUpdateNetworks, onUpdateBaseSettings]);

	return (
		<SettingsContext.Provider value={contextValue}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = (): TSettingsContext => useContext(SettingsContext);
export default useSettings;
