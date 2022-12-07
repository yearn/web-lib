import React, {createContext, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import {deepMerge} from '@yearn-finance/web-lib/contexts//utils';
import {useClientEffect} from '@yearn-finance/web-lib/hooks/useClientEffect';
import {useLocalStorage} from '@yearn-finance/web-lib/hooks/useLocalStorage';

import type {ReactElement} from 'react';
import type {TPossibleThemes, TUIContext, TUIOptions} from './types';

const	defaultOptions: TUIOptions = {
	shouldUseDefaultToaster: true,
	shouldUseThemes: true
};

const	UI = createContext<TUIContext>({
	theme: '',
	switchTheme: (): void => undefined,
	toast
});

export const UIContextApp = ({children, options = defaultOptions}: {
	children: ReactElement,
	options?: TUIOptions
}): ReactElement => {
	const uiOptions = deepMerge(defaultOptions, options) as TUIOptions;
	const userPrefersColorScheme = useRef<TPossibleThemes>();
	const [themeFromLs, set_themeFromLs] = useLocalStorage('theme', 'system-prefs');
	const [theme, set_theme] = useState(themeFromLs) as [string, (value: string) => void];

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
	useClientEffect((): (() => void) | undefined => {
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

	/* 💙 - Yearn Finance *********************************************************************
	**	Render the UIContext with it's parameters.
	**	The parameters will be accessible to the children via the useUI hook.
	******************************************************************************************/
	const	contextValue = useMemo((): TUIContext => ({
		theme,
		switchTheme,
		toast
	}), [theme, switchTheme]);

	return (
		<UI.Provider value={contextValue}>
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

export const useUI = (): TUIContext => useContext(UI);
export default useUI;
