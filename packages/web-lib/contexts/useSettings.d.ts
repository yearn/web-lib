import React from 'react';
import type { TSettingsContext, TSettingsContextApp } from './types';
export declare const SettingsContextApp: ({ children, baseOptions, networksOptions }: TSettingsContextApp) => React.ReactElement;
export declare const useSettings: () => TSettingsContext;
export default useSettings;
