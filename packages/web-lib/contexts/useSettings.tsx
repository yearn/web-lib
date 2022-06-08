import React, {createContext} from 'react';
import type * as useSettingsTypes from './useSettings.d';
import {deepMerge} from './utils';

const	defaultSettings = {
	1: {
		rpcURI: 'https://eth.public-rpc.com',
		graphURI: 'https://api.thegraph.com/subgraphs/name/0xkofee/yearn-vaults-v2',
		metaURI: 'https://meta.yearn.finance/api/1',
		apiURI: 'https://api.yearn.finance/v1/chains/1',
		explorerBaseURI: 'https://etherscan.io',
		lensAddress: '0x83d95e0D5f402511dB06817Aff3f9eA88224B030'
	},
	250: {
		rpcURI: 'https://rpc.ftm.tools',
		graphURI: 'https://api.thegraph.com/subgraphs/name/bsamuels453/yearn-fantom-validation-grafted',
		metaURI: 'https://meta.yearn.finance/api/250',
		apiURI: 'https://api.yearn.finance/v1/chains/250',
		explorerBaseURI: 'https://ftmscan.com',
		lensAddress: '0x57AA88A0810dfe3f9b71a9b179Dd8bF5F956C46A'
	},
	42161: {
		rpcURI: 'https://arbitrum.public-rpc.com',
		graphURI: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-arbitrum',
		metaURI: 'https://meta.yearn.finance/api/42161',
		apiURI: 'https://api.yearn.finance/v1/chains/42161',
		explorerBaseURI: 'https://arbiscan.io',
		lensAddress: '0x043518AB266485dC085a1DB095B8d9C2Fc78E9b9'
	}
};

const	SettingsContext = createContext<useSettingsTypes.TSettingsContext>({
	networks: defaultSettings,
	onUpdateNetworks: () => null,
});

/* 💙 - Yearn Finance *************************************************************************
**	Handle some global parameters for the app. This should be used to store specific elements
**	we want dApps to be able to customize, without being specific to the dApp.
**	One of theses parameters is the list of networks with the specific Yearn's endpoints.
**********************************************************************************************/
export const SettingsContextApp = ({children, options}: useSettingsTypes.TSettingsContextApp): React.ReactElement => {
	const	[networks, set_networks] = React.useState<useSettingsTypes.TSettingsContext>(() => (
		deepMerge(defaultSettings, options) as useSettingsTypes.TSettingsContext)
	);

	/* 💙 - Yearn Finance *********************************************************************
	**	The app can provide a new list of networks with their own data. They will be deep
	**	merged with the existing ones, aka the existing declarations will be overwritten but
	**	the new ones will be added.
	******************************************************************************************/
	function	onUpdateNetworks(newNetworkSettings: useSettingsTypes.TSettingsContext): void {
		set_networks(deepMerge(networks, newNetworkSettings) as useSettingsTypes.TSettingsContext);
	}

	/* 💙 - Yearn Finance *********************************************************************
	**	Render the SettingContext with it's parameters.
	**	The parameters will be accessible to the children via the useSettings hook.
	******************************************************************************************/
	return (
		<SettingsContext.Provider
			value={{
				networks: networks,
				onUpdateNetworks: onUpdateNetworks
			}}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = (): useSettingsTypes.TSettingsContext => React.useContext(SettingsContext);
export default useSettings;
