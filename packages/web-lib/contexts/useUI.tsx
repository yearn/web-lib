'use client';

import React, {createContext, ReactElement, useCallback, useContext, useRef, useState} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import {deepMerge} from '@yearn-finance/web-lib/contexts//utils';
import {useClientEffect} from '@yearn-finance/web-lib/hooks/useClientEffect';
import {useLocalStorage} from '@yearn-finance/web-lib/hooks/useLocalStorage';

import type * as useUITypes from './useUI.d';

const	defaultOptions: useUITypes.TUIOptions = {
	shouldUseDefaultToaster: true,
	shouldUseThemes: true
};

const	UI = createContext<useUITypes.TUIContext>({
	theme: '',
	switchTheme: (): void => undefined,
	toast
});

export const UIContextApp = ({children, options = defaultOptions}: {
	children: ReactElement,
	options?: useUITypes.TUIOptions
}): ReactElement => {
	const	uiOptions = deepMerge(defaultOptions, options) as useUITypes.TUIOptions;
	const	userPrefersColorScheme = useRef<useUITypes.TPossibleThemes>();
	const	[themeFromLs, set_themeFromLs] = useLocalStorage('theme', 'system-prefs');
	const	[theme, set_theme] = useState(themeFromLs) as [string, (value: string) => void];

	const switchTheme = useCallback((): void => {
		if (uiOptions.shouldUseThemes) {
			set_theme(theme === 'light' ? 'dark' : 'light');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);

	function	listenToThemeChange(event: MediaQueryListEvent): void {
		userPrefersColorScheme.current = event.matches ? 'dark' : 'light';
	}

	useClientEffect((): void => {
		if (uiOptions.shouldUseThemes) {
			set_theme(themeFromLs as string);
			if (themeFromLs === 'system-prefs') {
				const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				darkModeMediaQuery.addEventListener('change', listenToThemeChange);
				if (darkModeMediaQuery.matches) {
					userPrefersColorScheme.current = 'dark';
					set_theme('dark');
				} else {
					userPrefersColorScheme.current = 'light';
					set_theme('light');
				}
			}
		}
	}, [themeFromLs]);

	/* 🔵 - Yearn Finance ******************************************************
	** Once we are on the user's device, detect the user's preferes color
	** scheme and set the theme variable to it. This will allow us to have a 
	** better control on the theme switch
	**************************************************************************/
	useClientEffect((): any => {
		if (!uiOptions.shouldUseThemes) {
			return;
		}
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		darkModeMediaQuery.addEventListener('change', listenToThemeChange);
		if (darkModeMediaQuery.matches) {
			if (themeFromLs === 'dark') {
				userPrefersColorScheme.current = 'dark';
				set_theme('dark');
			}
		} else {
			if (themeFromLs === 'light') {
				userPrefersColorScheme.current = 'light';
				set_theme('light');
			}
		}
		return (): void => darkModeMediaQuery.removeEventListener('change', listenToThemeChange);
	}, []);

	/* 🔵 - Yearn Finance ******************************************************
	** If the theme changes, we will update our document body to add the
	** data-theme property. This property can be used to add more theme than
	** the regular light/dark pair.
	** if the selected theme matches the user's preference, clear this value.
	**************************************************************************/
	useClientEffect((): void => {
		if (!uiOptions.shouldUseThemes) {
			return;
		}
		if (theme === userPrefersColorScheme.current) {
			document.body.dataset.theme = theme;
			set_themeFromLs(theme);
		} else if (theme === 'light') {
			document.body.dataset.theme = 'light';
			set_themeFromLs('light');
		} else if (theme === 'dark') {
			document.body.dataset.theme = 'dark';
			set_themeFromLs('dark');
		}
	}, [theme]);

	return (
		<UI.Provider value={{theme, switchTheme, toast}}>
			{uiOptions.shouldUseDefaultToaster ? <Toaster
				position={'bottom-right'}
				containerClassName={'!z-[1000000]'}
				containerStyle={{zIndex: 1000000}}
				toastOptions={{
					className: 'text-sm text-neutral-700',
					style: {borderRadius: '0.5rem'}
				}} /> : null}
			{children}
		</UI.Provider>
	);
};

export const useUI = (): useUITypes.TUIContext => useContext(UI);
export default useUI;