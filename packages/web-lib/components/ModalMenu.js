import React, { cloneElement, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';
import IconSocialDiscord from '@yearn-finance/web-lib/icons/IconSocialDiscord';
import IconSocialGithub from '@yearn-finance/web-lib/icons/IconSocialGithub';
import IconSocialMedium from '@yearn-finance/web-lib/icons/IconSocialMedium';
import IconSocialTwitter from '@yearn-finance/web-lib/icons/IconSocialTwitter';
function MobileMenuItem({ option }) {
    return (React.createElement("div", { className: 'text-dark-blue-1 link pb-6' }, option.label));
}
function Menu(props) {
    const { options, wrapper, set_selected } = props;
    return (React.createElement("div", { className: 'flex h-screen flex-col justify-between pt-20' },
        React.createElement("nav", { className: 'flex flex-col pt-2' }, options.map((option) => {
            if (wrapper) {
                return (React.createElement("div", { key: option.route }, cloneElement(wrapper, { href: option.route }, React.createElement("a", null,
                    React.createElement(MobileMenuItem, { option: option })))));
            }
            return (React.createElement("div", { key: option.route, onClick: () => set_selected(option.route) },
                React.createElement(MobileMenuItem, { option: option })));
        })),
        React.createElement("div", { className: 'mt-auto pb-6' },
            React.createElement("div", { className: 'flex flex-row items-center justify-center space-x-4' },
                React.createElement("div", { className: 'text-neutral-500 transition-colors' },
                    React.createElement("a", { href: 'https://twitter.com/iearnfinance', target: '_blank', rel: 'noreferrer' },
                        React.createElement("span", { className: 'sr-only' }, 'Twitter'),
                        React.createElement(IconSocialTwitter, null))),
                React.createElement("div", { className: 'text-neutral-500 transition-colors' },
                    React.createElement("a", { href: process.env.PROJECT_GITHUB_URL, target: '_blank', rel: 'noreferrer' },
                        React.createElement("span", { className: 'sr-only' }, 'Github'),
                        React.createElement(IconSocialGithub, null))),
                React.createElement("div", { className: 'text-neutral-500 transition-colors' },
                    React.createElement("a", { href: 'https://discord.yearn.finance/', target: '_blank', rel: 'noreferrer' },
                        React.createElement("span", { className: 'sr-only' }, 'Discord'),
                        React.createElement(IconSocialDiscord, null))),
                React.createElement("div", { className: 'text-neutral-500 transition-colors' },
                    React.createElement("a", { href: 'https://medium.com/iearn', target: '_blank', rel: 'noreferrer' },
                        React.createElement("span", { className: 'sr-only' }, 'Medium'),
                        React.createElement(IconSocialMedium, null)))))));
}
function ModalMenu(props) {
    const { isOpen, set_isOpen, options, set_selected, wrapper } = props;
    const ref = useRef();
    return (React.createElement(Transition.Root, { show: isOpen, as: Fragment },
        React.createElement(Dialog, { static: true, className: 'fixed inset-0 h-screen w-screen overflow-hidden', style: { zIndex: 9999999 }, initialFocus: ref, open: isOpen, onClose: set_isOpen },
            React.createElement("div", { className: 'yearn--modal-menu-dialog', style: { background: 'rgba(255,255,255,0.68)' } },
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0', enterTo: 'opacity-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                    React.createElement(Dialog.Overlay, { className: 'fixed inset-0 z-10' })),
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', enterTo: 'opacity-100 translate-y-0 sm:scale-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100 translate-y-0 sm:scale-100', leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' },
                    React.createElement("div", { className: 'relative z-50 h-full w-full transition-all' },
                        React.createElement("div", { ref: ref, className: 'absolute top-4 right-2', onClick: () => set_isOpen(false) },
                            React.createElement(IconCross, null)),
                        React.createElement(Menu, { options: options, set_selected: set_selected, wrapper: wrapper })))))));
}
export { ModalMenu };
