import	React, {createContext, ReactElement}	from	'react';
import	toast, {Toaster}						from	'react-hot-toast';
import	{useLocalStorage}						from	'../hooks/useLocalStorage';
import	{useClientEffect}						from	'../hooks/useClientEffect';

type	TUIContext = {
	theme: string,
	switchTheme: () => void,
	toast: unknown
}
type	TPossibleThemes = 'dark' | 'light';
const	UI = createContext<TUIContext>({theme: '', switchTheme: (): void => undefined, toast});
export const UIContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const	userPrefersColorScheme = React.useRef<TPossibleThemes>();
	const	[themeFromLs, set_themeFromLs] = useLocalStorage('theme', '');
	const	[theme, set_theme] = React.useState(themeFromLs) as [string, (value: string) => void];

	const switchTheme = React.useCallback((): void => {
		set_theme(['light', 'light-initial'].includes(theme) ? 'dark' : 'light');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);

	function	listenToThemeChange(event: MediaQueryListEvent) {
		userPrefersColorScheme.current = event.matches ? 'dark' : 'light';
	}

	useClientEffect((): void => {
		set_theme(themeFromLs as string);
	}, [themeFromLs]);

	/* 🔵 - Yearn Finance ******************************************************
	** Once we are on the user's device, detect the user's preferes color
	** scheme and set the theme variable to it. This will allow us to have a 
	** better control on the theme switch
	**************************************************************************/
	useClientEffect(() => {
		const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		lightModeMediaQuery.addEventListener('change', listenToThemeChange)
		if (lightModeMediaQuery.matches) {
			userPrefersColorScheme.current = 'dark';
			set_theme('dark');
		} else {
			userPrefersColorScheme.current = 'light';
			set_theme('light');
		}
		return () => lightModeMediaQuery.removeEventListener('change', listenToThemeChange);
	}, []);

	/* 🔵 - Yearn Finance ******************************************************
	** If the theme changes, we will update our document body to add the
	** data-theme property. This property can be used to add more theme than
	** the regular light/dark pair.
	** if the selected theme matches the user's preference, clear this value.
	**************************************************************************/
	useClientEffect((): void => {
		if (theme === userPrefersColorScheme.current) {
			document.body.dataset.theme = '';
			document.body.removeAttribute('data-theme')
		} else if (theme === 'light') {
			document.body.dataset.theme = 'light';
			set_themeFromLs('light');
		} else if (theme === 'dark' || theme === 'dark-initial') {
			document.body.dataset.theme = 'dark';
			set_themeFromLs('dark');
		}
	}, [theme]);

	return (
		<UI.Provider value={{theme, switchTheme, toast}}>
			<Toaster
				position={'bottom-right'}
				toastOptions={{className: 'text-sm text-typo-primary', style: {borderRadius: '0.5rem'}}} />
			{children}
		</UI.Provider>
	);
};

export const useUI = (): TUIContext => React.useContext(UI);
export default useUI;