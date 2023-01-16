import React, { cloneElement, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';
function Dropdown(props) {
    const { options, defaultOption, selected, onSelect } = props;
    return (React.createElement("div", null,
        React.createElement(Menu, { as: 'menu', className: 'relative inline-block text-left' }, ({ open }) => (React.createElement(React.Fragment, null,
            React.createElement(Menu.Button, { "data-variant": 'light', className: 'yearn--button flex items-center justify-between' },
                React.createElement("div", { className: 'flex flex-row items-center' },
                    selected?.icon ? cloneElement(selected.icon, { className: 'w-5 h-5 mr-2 min-w-[24px]' }) : null,
                    React.createElement("p", { className: 'font-roboto font-normal text-inherit' }, selected?.label || defaultOption.label)),
                React.createElement(IconChevron, { className: `ml-3 h-4 w-4 transition-transform${open ? '-rotate-90' : '-rotate-180'}` })),
            React.createElement(Transition, { as: Fragment, show: open, enter: 'transition duration-100 ease-out', enterFrom: 'transform scale-95 opacity-0', enterTo: 'transform scale-100 opacity-100', leave: 'transition duration-75 ease-out', leaveFrom: 'transform scale-100 opacity-100', leaveTo: 'transform scale-95 opacity-0' },
                React.createElement(Menu.Items, { className: 'yearn--dropdown-menu' }, options.map((option) => (React.createElement(Menu.Item, { key: option.value }, ({ active }) => (React.createElement("div", { onClick: () => onSelect(option), "data-active": active, className: 'yearn--dropdown-menu-item' },
                    option.icon ? cloneElement(option.icon, { className: 'w-5 h-5 mr-2 min-w-[24px]' }) : null,
                    React.createElement("p", null, option.label)))))))))))));
}
export { Dropdown };
