import React, { cloneElement, Fragment, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import IconChevronBottom from '@yearn-finance/web-lib/icons/IconChevronBottom';
import { chains } from '@yearn-finance/web-lib/utils/web3/chains';
import LoginPopover from '../components/LoginPopover';
const Link = (props) => {
    const { tag, ...rest } = props;
    const Element = cloneElement(tag, rest);
    return Element;
};
function Navbar({ nav, linkComponent = React.createElement("a", null), currentPathName }) {
    return (React.createElement("nav", { className: 'yearn--nav' }, nav.map((option) => (React.createElement(Link, { tag: linkComponent, key: option.path, target: option.target, href: option.path },
        React.createElement("p", { className: `yearn--header-nav-item ${currentPathName === option.path ? 'active' : ''}` }, option.label))))));
}
function NetworkSelector({ supportedChainID }) {
    const { safeChainID } = useChainID();
    const { onSwitchChain } = useWeb3();
    const supportedNetworks = useMemo(() => {
        const noTestnet = supportedChainID.filter((chainID) => chainID !== 1337);
        return noTestnet.map((chainID) => ({ value: chainID, label: chains[chainID]?.displayName || `Chain ${chainID}` }));
    }, [supportedChainID]);
    const currentNetwork = useMemo(() => (supportedNetworks.find((network) => network.value === safeChainID)), [safeChainID, supportedNetworks]);
    if (supportedNetworks.length === 1) {
        if (currentNetwork?.value === supportedNetworks[0]?.value) {
            return (React.createElement("button", { disabled: true, suppressHydrationWarning: true, className: 'yearn--header-nav-item mr-4 hidden !cursor-default flex-row items-center border-0 p-0 text-sm hover:!text-neutral-500 md:flex' },
                React.createElement("div", { suppressHydrationWarning: true, className: 'relative flex flex-row items-center' }, supportedNetworks[0]?.label || 'Ethereum')));
        }
        return (React.createElement("button", { suppressHydrationWarning: true, onClick: () => onSwitchChain(supportedNetworks[0].value, true), className: 'yearn--header-nav-item mr-4 hidden cursor-pointer flex-row items-center border-0 p-0 text-sm hover:!text-neutral-500 md:flex' },
            React.createElement("div", { suppressHydrationWarning: true, className: 'relative flex flex-row items-center' }, 'Invalid Network')));
    }
    return (React.createElement("div", { className: 'relative z-50 mr-4' },
        React.createElement(Listbox, { value: safeChainID, onChange: (value) => onSwitchChain(value.value, true) }, ({ open }) => (React.createElement(React.Fragment, null,
            React.createElement(Listbox.Button, { suppressHydrationWarning: true, className: 'yearn--header-nav-item hidden flex-row items-center border-0 p-0 text-sm md:flex' },
                React.createElement("div", { suppressHydrationWarning: true, className: 'relative flex flex-row items-center' }, currentNetwork?.label || 'Ethereum'),
                React.createElement("div", { className: 'ml-2' },
                    React.createElement(IconChevronBottom, { className: `h-5 w-4 transition-transform ${open ? '-rotate-180' : 'rotate-0'}` }))),
            React.createElement(Transition, { as: Fragment, show: open, enter: 'transition duration-100 ease-out', enterFrom: 'transform scale-95 opacity-0', enterTo: 'transform scale-100 opacity-100', leave: 'transition duration-75 ease-out', leaveFrom: 'transform scale-100 opacity-100', leaveTo: 'transform scale-95 opacity-0' },
                React.createElement(Listbox.Options, { className: 'yearn--listbox-menu -ml-1 !bg-neutral-100' }, supportedNetworks.map((network) => (React.createElement(Listbox.Option, { key: network.value, value: network }, ({ active }) => (React.createElement("div", { "data-active": active, className: 'yearn--listbox-menu-item text-sm' }, network?.label || 'Ethereum'))))))))))));
}
function Header({ logo, extra, linkComponent, nav, currentPathName, supportedNetworks, onOpenMenuMobile }) {
    const { options } = useWeb3();
    const supportedChainID = useMemo(() => (supportedNetworks || options?.supportedChainID || [1, 10, 250, 42161]), [supportedNetworks, options?.supportedChainID]);
    return (React.createElement("header", { className: 'yearn--header' },
        React.createElement(Navbar, { linkComponent: linkComponent, currentPathName: currentPathName, nav: nav }),
        React.createElement("div", { className: 'flex w-1/3 md:hidden' },
            React.createElement("button", { onClick: onOpenMenuMobile },
                React.createElement("span", { className: 'sr-only' }, 'Open menu'),
                React.createElement("svg", { className: 'text-neutral-500', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                    React.createElement("path", { d: 'M2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4H22C22.5523 4 23 3.55228 23 3C23 2.44772 22.5523 2 22 2H2Z', fill: 'currentcolor' }),
                    React.createElement("path", { d: 'M2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10H14C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8H2Z', fill: 'currentcolor' }),
                    React.createElement("path", { d: 'M1 15C1 14.4477 1.44772 14 2 14H22C22.5523 14 23 14.4477 23 15C23 15.5523 22.5523 16 22 16H2C1.44772 16 1 15.5523 1 15Z', fill: 'currentcolor' }),
                    React.createElement("path", { d: 'M2 20C1.44772 20 1 20.4477 1 21C1 21.5523 1.44772 22 2 22H14C14.5523 22 15 21.5523 15 21C15 20.4477 14.5523 20 14 20H2Z', fill: 'currentcolor' })))),
        React.createElement("div", { className: 'flex w-1/3 justify-center' },
            React.createElement("div", { className: 'relative h-8 w-8' }, logo)),
        React.createElement("div", { className: 'flex w-1/3 items-center justify-end' },
            React.createElement(NetworkSelector, { supportedChainID: supportedChainID }),
            React.createElement(LoginPopover, null),
            extra)));
}
export default Header;
