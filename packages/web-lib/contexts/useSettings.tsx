import React, {createContext} from 'react';
import {getRPC} from '../utils/providers';
import type * as useSettingsTypes from './useSettings.d';
import {deepMerge} from './utils';

const	defaultSettings = {
	1: {
		rpcURI: getRPC(1),
		graphURI: 'https://api.thegraph.com/subgraphs/name/0xkofee/yearn-vaults-v2',
		metaURI: 'https://meta.yearn.finance/api/1',
		apiURI: 'https://api.yearn.finance/v1/chains/1',
		explorerBaseURI: 'https://etherscan.io',
		lensAddress: '0x83d95e0D5f402511dB06817Aff3f9eA88224B030',
		partnerContractAddress: '0x8ee392a4787397126C163Cb9844d7c447da419D8'
	},
	250: {
		rpcURI: getRPC(250),
		graphURI: 'https://api.thegraph.com/subgraphs/name/bsamuels453/yearn-fantom-validation-grafted',
		metaURI: 'https://meta.yearn.finance/api/250',
		apiURI: 'https://api.yearn.finance/v1/chains/250',
		explorerBaseURI: 'https://ftmscan.com',
		lensAddress: '0x57AA88A0810dfe3f9b71a9b179Dd8bF5F956C46A',
		partnerContractAddress: '0x086865B2983320b36C42E48086DaDc786c9Ac73B'
	},
	42161: {
		rpcURI: getRPC(42161),
		graphURI: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-arbitrum',
		metaURI: 'https://meta.yearn.finance/api/42161',
		apiURI: 'https://api.yearn.finance/v1/chains/42161',
		explorerBaseURI: 'https://arbiscan.io',
		lensAddress: '0x043518AB266485dC085a1DB095B8d9C2Fc78E9b9',
		partnerContractAddress: '0x0000000000000000000000000000000000000000'
	},
	1337: {
		rpcURI: getRPC(1337),
		graphURI: 'https://api.thegraph.com/subgraphs/name/0xkofee/yearn-vaults-v2',
		metaURI: 'https://meta.yearn.finance/api/1',
		apiURI: 'https://api.yearn.finance/v1/chains/1',
		explorerBaseURI: 'https://etherscan.io',
		lensAddress: '0x83d95e0D5f402511dB06817Aff3f9eA88224B030',
		partnerContractAddress: '0x8ee392a4787397126C163Cb9844d7c447da419D8'
	}
};

const	SettingsContext = createContext<useSettingsTypes.TSettingsContext>({
	networks: defaultSettings,
	onUpdateNetworks: (): null => null
});

/* 💙 - Yearn Finance *************************************************************************
**	Handle some global parameters for the app. This should be used to store specific elements
**	we want dApps to be able to customize, without being specific to the dApp.
**	One of theses parameters is the list of networks with the specific Yearn's endpoints.
**********************************************************************************************/
export const SettingsContextApp = ({children, options = {}}: useSettingsTypes.TSettingsContextApp): React.ReactElement => {
	const	[networks, set_networks] = React.useState<useSettingsTypes.TSettingsContext>((): useSettingsTypes.TSettingsContext => (
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
