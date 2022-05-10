import	React, {ReactElement}		from	'react';
import	useClientEffect				from	'../hooks/useClientEffect';
import	IconThemeDark				from	'../icons/IconThemeDark';
import	IconThemeLight				from	'../icons/IconThemeLight';
import type * as SwitchThemeTypes	from 	'./SwitchTheme.d';

function	SwitchTheme({theme, switchTheme, ...props}: SwitchThemeTypes.TSwitchTheme): ReactElement {
	const	[currentTheme, set_currentTheme] = React.useState('light');

	useClientEffect((): void => {
		set_currentTheme(theme);
	}, [theme]);

	return (
		<div
			{...props}
			role={'button'}
			tabIndex={0}
			onKeyDown={({keyCode}: {keyCode: number}) => keyCode === 13 ? switchTheme() : null}
			onClick={switchTheme}
			className={`hidden flex-row items-center md:flex space-x-2 ${props.className ?? ''}`}>
			<IconThemeLight
				aria-label={'Switch to light theme'}
				className={`w-5 h-5 transition-colors cursor-pointer ${['light', 'light-initial'].includes(currentTheme) ? 'text-primary' : 'text-typo-secondary hover:text-primary'}`} />
			<IconThemeDark
				aria-label={'Switch to dark theme'}
				className={`w-5 h-5 transition-colors cursor-pointer ${currentTheme === 'dark' ? 'text-primary' : 'text-typo-secondary hover:text-primary'}`} />
		</div>
	);
}

export {SwitchTheme};