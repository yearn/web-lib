import React, { forwardRef } from 'react';
import IconLoader from '@yearn-finance/web-lib/icons/IconLoader';
const Button = forwardRef((props) => {
    const { children, variant = 'filled', shouldStopPropagation = false, isBusy = false, isDisabled = false, ...rest } = props;
    if (rest.as === 'a') {
        return (React.createElement("a", { tabIndex: -1, ...rest },
            React.createElement("button", { "data-variant": variant, className: `yearn--button flex-center ${rest.className}` }, children)));
    }
    return (React.createElement("button", { ...rest, "data-variant": variant, className: `yearn--button ${rest.className}`, "aria-busy": isBusy, disabled: isDisabled || rest.disabled, onClick: (event) => {
            if (shouldStopPropagation) {
                event.stopPropagation();
            }
            if (!isBusy && rest.onClick) {
                rest.onClick(event);
            }
        } },
        children,
        isBusy ? (React.createElement("div", { className: 'absolute inset-0 flex items-center justify-center' },
            React.createElement(IconLoader, { className: 'text-neutral-0 h-6 w-6 animate-spin' }))) : null));
});
export { Button };
