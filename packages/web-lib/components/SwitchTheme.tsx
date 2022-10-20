import React, {ReactElement, useState} from 'react';
import {useClientEffect} from '@yearn-finance/web-lib/hooks';
import IconThemeDark from '@yearn-finance/web-lib/icons/IconThemeDark';
import IconThemeLight from '@yearn-finance/web-lib/icons/IconThemeLight';

import type {TSwitchTheme} from './SwitchTheme.d';

function	SwitchTheme(props: TSwitchTheme): ReactElement {
	const	{theme, switchTheme, ...rest} = props;
	const	[currentTheme, set_currentTheme] = useState('light');

	useClientEffect((): void => {
		set_currentTheme(theme);
	}, [theme]);

	return (
		<div
			{...rest}
			role={'button'}
			tabIndex={0}
			onKeyDown={({keyCode}: {keyCode: number}): unknown => keyCode === 13 ? switchTheme() : null}
			onClick={switchTheme}
			className={`hidden flex-row items-center space-x-2 md:flex ${rest.className ?? ''}`}>
			<IconThemeLight
				aria-label={'Switch to light theme'}
				className={`h-5 w-5 cursor-pointer transition-colors ${['light', 'light-initial'].includes(currentTheme) ? 'text-primary-500' : 'hover:text-primary-500 text-neutral-500'}`} />
			<IconThemeDark
				aria-label={'Switch to dark theme'}
				className={`h-5 w-5 cursor-pointer transition-colors ${currentTheme === 'dark' ? 'text-primary-500' : 'hover:text-primary-500 text-neutral-500'}`} />
		</div>
	);
}

export {SwitchTheme};