import React, { cloneElement, useState } from 'react';
import { ModalMenu } from '@yearn-finance/web-lib/components/ModalMenu';
import IconHamburger from '@yearn-finance/web-lib/icons/IconHamburger';
function NavbarMenuItem({ option, selected }) {
    return (React.createElement("div", { className: 'group flex flex-row items-center' },
        React.createElement("div", { className: `mr-4 cursor-pointer py-1 transition-colors ${option.values.includes(selected) ? 'text-primary-500' : 'group-hover:text-primary-500 text-neutral-500'}` }, option.icon ? (cloneElement(option.icon, { className: 'w-6 min-w-[1.5rem] h-6' })) : (React.createElement("div", { className: 'mr-4 h-6 w-6 min-w-[1.5rem] cursor-pointer py-1' }))),
        React.createElement("p", { className: `cursor-pointer py-1 transition-colors ${option.values.includes(selected) ? 'text-primary-500' : 'group-hover:text-primary-500 text-neutral-500'}` }, option.label)));
}
function NavbarMenuSubItem({ option, selected }) {
    return (React.createElement("div", { className: 'group flex flex-row items-center' },
        React.createElement("div", { className: 'mr-4 h-6 w-6 min-w-[1.5rem] cursor-pointer py-1' }),
        React.createElement("p", { className: `cursor-pointer py-1 transition-colors ${option.values.includes(selected) ? 'text-primary-500' : 'group-hover:text-primary-500 text-neutral-500'}` }, option.label)));
}
function Navbar({ options, logo, title, selected, set_selected, children, wrapper, ...props }) {
    const [hasOpenMenu, set_hasOpenMenu] = useState(false);
    return (React.createElement("aside", { "aria-label": 'aside-navigation', className: 'relative top-0 w-auto min-w-full pt-0 md:sticky md:w-full md:min-w-[10rem] md:pt-9', ...props },
        React.createElement("div", { "aria-label": 'dektop-navigation', className: 'hidden flex-col md:flex', style: { height: 'calc(100vh - 4.50rem)' } },
            React.createElement("a", { href: '/' },
                React.createElement("div", { className: 'flex cursor-pointer flex-row items-center' },
                    React.createElement("span", { className: 'sr-only' }, 'Home'),
                    React.createElement("div", { className: title ? 'mr-4' : '' }, cloneElement(logo)),
                    title ? React.createElement("h1", { className: 'lowercase' }, title) : null)),
            React.createElement("nav", { className: 'scrollbar-none mt-12 flex max-h-[75vh] flex-col space-y-4 overflow-y-auto' }, options.map((option) => {
                if (wrapper) {
                    return (React.createElement("div", { key: option.route, className: 'space-y-2' },
                        cloneElement(wrapper, { href: option.route }, React.createElement("a", null,
                            React.createElement(NavbarMenuItem, { option: option, selected: selected }))),
                        (option.options || [])?.map((subOption) => (React.createElement("div", { key: subOption.route }, cloneElement(wrapper, { href: subOption.route }, React.createElement("a", null,
                            React.createElement(NavbarMenuSubItem, { option: subOption, selected: selected }))))))));
                }
                return (React.createElement("div", { key: option.route, onClick: () => set_selected(option.route), className: 'space-y-2' },
                    React.createElement(NavbarMenuItem, { option: option, selected: selected }),
                    (option.options || [])?.map((subOption) => (React.createElement("div", { key: subOption.route, onClick: () => set_selected(subOption.route) },
                        React.createElement(NavbarMenuSubItem, { option: subOption, selected: selected }))))));
            })),
            children),
        React.createElement("div", { "aria-label": 'mobile-navigation', className: 'bg-neutral-0 flex flex-row items-center justify-between border-b border-neutral-300 p-4 md:hidden' },
            React.createElement("a", { href: '/' },
                React.createElement("div", { className: 'flex cursor-pointer flex-row items-center' },
                    React.createElement("span", { className: 'sr-only' }, 'Home'),
                    React.createElement("div", { className: title ? 'mr-4' : '' }, cloneElement(logo, { className: `h-8 ${logo.props.className}` })),
                    title ? React.createElement("h1", { className: 'lowercase' }, title) : null)),
            React.createElement("div", { onClick: () => set_hasOpenMenu(true), className: '-m-1 p-1' },
                React.createElement(IconHamburger, { className: 'h-8 w-8 text-neutral-700' })),
            React.createElement(ModalMenu, { isOpen: hasOpenMenu, set_isOpen: set_hasOpenMenu, set_selected: set_selected, options: options, wrapper: wrapper }))));
}
export { Navbar };
