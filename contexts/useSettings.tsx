import	React, {createContext, useCallback, useContext, useMemo} from 'react';
import	{deepMerge} from '@yearn-finance/web-lib/contexts/utils';
import	{useLocalStorage} from '@yearn-finance/web-lib/hooks/useLocalStorage';
import	performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';

import type {TSettingsBase, TSettingsContext, TSettingsContextApp} from '@yearn-finance/web-lib/types/contexts';

const	defaultSettings = {
	yDaemonBaseURI: 'https://ydaemon.yearn.finance',
	metaBaseURI: 'https://meta.yearn.finance',
	apiBaseURI: 'https://api.yearn.finance'
};

const	SettingsContext = createContext<TSettingsContext>({
	settings: defaultSettings,
	onUpdateBaseSettings: (): null => null
});

/* 💙 - Yearn Finance *************************************************************************
**	Handle some global parameters for the app. This should be used to store specific elements
**	we want dApps to be able to customize, without being specific to the dApp.
**	One of theses parameters is the list of networks with the specific Yearn's endpoints.
**********************************************************************************************/
export const SettingsContextApp = ({
	children,
	baseOptions = defaultSettings
}: TSettingsContextApp): React.ReactElement => {
	const	[baseSettings, set_baseSettings] = useLocalStorage(
		'yearnSettingsBase',
		deepMerge(defaultSettings, baseOptions) as TSettingsBase,
		{currentVersion: 1, shouldMigratePreviousVersion: true}
	);

	/* 💙 - Yearn Finance *********************************************************************
	**	The app can provide a new list of base options. They will be deep merged with the
	**	existing ones, aka the existing declarations will be overwritten but the new ones will
	**	be added. Networks settings are updated accordingly.
	******************************************************************************************/
	const onUpdateBaseSettings = useCallback((newSettings: TSettingsBase): void => {
		performBatchedUpdates((): void => {
			set_baseSettings(newSettings);
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/* 💙 - Yearn Finance *********************************************************************
	**	Render the SettingContext with it's parameters.
	**	The parameters will be accessible to the children via the useSettings hook.
	******************************************************************************************/
	const	contextValue = useMemo((): TSettingsContext => ({
		settings: baseSettings as TSettingsBase,
		onUpdateBaseSettings: onUpdateBaseSettings
	}), [baseSettings, onUpdateBaseSettings]);

	return (
		<SettingsContext.Provider value={contextValue}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = (): TSettingsContext => useContext(SettingsContext);
export default useSettings;
