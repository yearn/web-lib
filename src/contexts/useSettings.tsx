import React, {createContext, useCallback, useContext, useMemo} from 'react';

import {useLocalStorage} from '../hooks/useLocalStorage.js';
import {performBatchedUpdates} from '../utils/performBatchedUpdates.js';
import {deepMerge} from './utils.js';

import type {TSettingsBase, TSettingsContext, TSettingsContextApp} from '../types/contexts.js';

const defaultSettings = {
	yDaemonBaseURI: 'https://ydaemon.yearn.fi',
	metaBaseURI: 'https://meta.yearn.fi',
	apiBaseURI: 'https://api.yearn.fi'
};

const SettingsContext = createContext<TSettingsContext>({
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
	const [baseSettings, set_baseSettings] = useLocalStorage(
		'yearnSettingsBase_0.0.2',
		deepMerge(defaultSettings, baseOptions) as TSettingsBase,
		{currentVersion: 2, shouldMigratePreviousVersion: true}
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
	}, []);

	/* 💙 - Yearn Finance *********************************************************************
	 **	Render the SettingContext with it's parameters.
	 **	The parameters will be accessible to the children via the useSettings hook.
	 ******************************************************************************************/
	const contextValue = useMemo(
		(): TSettingsContext => ({
			settings: baseSettings as TSettingsBase,
			onUpdateBaseSettings: onUpdateBaseSettings
		}),
		[baseSettings, onUpdateBaseSettings]
	);

	return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): TSettingsContext => useContext(SettingsContext);
