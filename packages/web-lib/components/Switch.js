import React, { useState } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
function Switch(props) {
    const { isEnabled, onSwitch } = props;
    const [isEnabledState, set_isEnabledState] = useState(isEnabled);
    function safeOnSwitch() {
        if (onSwitch) {
            onSwitch(!isEnabled);
        }
        else {
            set_isEnabledState(!isEnabledState);
        }
    }
    return (React.createElement("div", null,
        React.createElement(HeadlessSwitch, { checked: onSwitch ? isEnabled : isEnabledState, onChange: safeOnSwitch, onKeyDown: ({ keyCode }) => keyCode === 13 ? safeOnSwitch() : null, className: 'yearn--switch' },
            React.createElement("span", { className: 'sr-only' }, 'Use setting'),
            React.createElement("div", { "aria-hidden": 'true', className: (onSwitch ? isEnabled : isEnabledState) ? 'translate-x-4' : 'translate-x-0' }))));
}
export { Switch };
