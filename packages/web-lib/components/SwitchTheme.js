import React, { useState } from 'react';
import { useClientEffect } from '@yearn-finance/web-lib/hooks/useClientEffect';
import IconThemeDark from '@yearn-finance/web-lib/icons/IconThemeDark';
import IconThemeLight from '@yearn-finance/web-lib/icons/IconThemeLight';
function SwitchTheme(props) {
    const { theme, switchTheme, ...rest } = props;
    const [currentTheme, set_currentTheme] = useState('light');
    useClientEffect(() => {
        set_currentTheme(theme);
    }, [theme]);
    return (React.createElement("div", { ...rest, role: 'button', tabIndex: 0, onKeyDown: ({ keyCode }) => keyCode === 13 ? switchTheme() : null, onClick: switchTheme, className: `hidden flex-row items-center space-x-2 md:flex ${rest.className ?? ''}` },
        React.createElement(IconThemeLight, { "aria-label": 'Switch to light theme', className: `h-5 w-5 cursor-pointer transition-colors ${['light', 'light-initial'].includes(currentTheme) ? 'text-primary-500' : 'hover:text-primary-500 text-neutral-500'}` }),
        React.createElement(IconThemeDark, { "aria-label": 'Switch to dark theme', className: `h-5 w-5 cursor-pointer transition-colors ${currentTheme === 'dark' ? 'text-primary-500' : 'hover:text-primary-500 text-neutral-500'}` })));
}
export { SwitchTheme };
