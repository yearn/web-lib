import	React, {createContext, ReactElement}	from	'react';
import	{Toaster}								from	'react-hot-toast';
import	{useLocalStorage}						from	'../hooks/useLocalStorage';
import	{useClientEffect}						from	'../hooks/useClientEffect';

type	TUIContext = {
	theme: string,
	switchTheme: () => void
}

const	UI = createContext<TUIContext>({theme: 'light', switchTheme: (): void => undefined});
export const UIContextApp: React.FC = ({children}): ReactElement => {
	const	[themeFromLs, set_themeFromLs] = useLocalStorage('theme', 'light-initial');
	const	[theme, set_theme] = React.useState(themeFromLs) as [string, (value: string) => void];

	const switchTheme = React.useCallback((): void => {
		set_theme(['light', 'light-initial'].includes(theme) ? 'dark' : 'light');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);

	useClientEffect((): void => {
		set_theme(themeFromLs as string);
	}, [themeFromLs]);

	useClientEffect((): void => {
		if (theme !== 'light-initial') {
			const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
			if (lightModeMediaQuery.matches)
				set_theme('light');
		}
	}, []);

	useClientEffect((): void => {
		if (theme === 'light') {
			document.body.dataset.theme = 'light';
			set_themeFromLs('light');
		} else if (theme === 'dark' || theme === 'dark-initial') {
			document.body.dataset.theme = 'dark';
			set_themeFromLs('dark');
		}
	}, [theme]);

	return (
		<UI.Provider value={{theme, switchTheme}}>
			<Toaster
				position={'bottom-right'}
				toastOptions={{className: 'text-sm text-typo-primary', style: {borderRadius: '0.5rem'}}} />
			{children}
		</UI.Provider>
	);
};

export const useUI = (): TUIContext => React.useContext(UI);
export default useUI;
