import React, { cloneElement, Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { yToast } from '@yearn-finance/web-lib/components/yToast';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import { useInjectedWallet } from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';
import { truncateHex } from '@yearn-finance/web-lib/utils/address';
import { chains } from '@yearn-finance/web-lib/utils/web3/chains';
function Modal(props) {
    const { isOpen, onClose, className = '', children } = props;
    const ref = useRef();
    return (React.createElement(Transition.Root, { show: isOpen, as: Fragment },
        React.createElement(Dialog, { as: 'div', className: 'fixed inset-0 overflow-y-auto', style: { zIndex: 9999 }, initialFocus: ref, onClose: onClose },
            React.createElement("div", { className: `${className} relative flex min-h-screen items-end justify-end px-0 pt-4 pb-0 text-center sm:block sm:p-0` },
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0', enterTo: 'opacity-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                    React.createElement(Dialog.Overlay, { className: `${className} yearn--modal-overlay` })),
                React.createElement("span", { className: 'hidden sm:inline-block sm:h-screen sm:align-bottom', "aria-hidden": 'true' }, "\u200B"),
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-200', enterFrom: 'opacity-0 translate-y-full', enterTo: 'opacity-100 translate-y-0', leave: 'ease-in duration-200', leaveFrom: 'opacity-100 translate-y-0', leaveTo: 'opacity-0 translate-y-full' },
                    React.createElement("div", { ref: ref, className: `${className} yearn--modal fixed bottom-0` }, children))))));
}
function ModalMobileMenu(props) {
    const { isOpen, onClose, shouldUseWallets = true, shouldUseNetworks = true, children } = props;
    const { onSwitchChain, isActive, address, ens, onDesactivate, onConnect, options } = useWeb3();
    const [walletIdentity, set_walletIdentity] = useState('Connect a wallet');
    const [optionsForSelect, set_optionsForSelect] = useState([]);
    const detectedWalletProvider = useInjectedWallet();
    const { chainID } = useChainID();
    const { toast } = yToast();
    useEffect(() => {
        if (!isActive && address) {
            if (ens) {
                set_walletIdentity(ens);
            }
            else {
                set_walletIdentity(truncateHex(address, 4));
            }
        }
        else if (ens) {
            set_walletIdentity(ens);
        }
        else if (address) {
            set_walletIdentity(truncateHex(address, 4));
        }
        else {
            set_walletIdentity('Connect a wallet');
        }
    }, [ens, address, isActive]);
    function renderNotActive() {
        if (shouldUseWallets && !isActive && !address) {
            return (React.createElement("div", { className: 'grid grid-cols-2 gap-2 p-2' },
                React.createElement("div", { onClick: () => {
                        onConnect('INJECTED', () => toast({ content: 'Impossible to connect to your wallet', type: 'error' }), () => undefined);
                    }, className: 'yearn--modalMobileMenu-walletCard' },
                    React.createElement("div", null, cloneElement(detectedWalletProvider.icon, { style: { width: 40, height: 40 } })),
                    React.createElement("b", { className: 'mt-4 text-sm text-neutral-500' }, detectedWalletProvider.name)),
                React.createElement("div", { onClick: () => {
                        onConnect('WALLET_CONNECT', () => toast({ content: 'Impossible to connect to your wallet', type: 'error' }), () => undefined);
                    }, className: 'yearn--modalMobileMenu-walletCard' },
                    React.createElement(IconWalletWalletConnect, { style: { width: 40, height: 40 } }),
                    React.createElement("b", { className: 'mt-4 text-sm text-neutral-500' }, 'Wallet Connect'))));
        }
        return null;
    }
    useEffect(() => {
        const allChainsID = (options?.supportedChainID || [1]).filter((id) => ![1337, 31337].includes(id));
        const noDuplicates = [...new Set(allChainsID)];
        set_optionsForSelect(noDuplicates);
    }, [options]);
    return (React.createElement(Modal, { isOpen: isOpen, onClose: () => onClose() },
        React.createElement("div", { className: 'yearn--modalMobileMenu-content' },
            shouldUseWallets ? (React.createElement("h4", { className: 'yearn--modalMobileMenu-title' }, walletIdentity === 'Connect a wallet' ? walletIdentity : walletIdentity)) : null,
            shouldUseNetworks ? (React.createElement("div", { className: 'yearn--modalMobileMenu-networkIndicator' },
                React.createElement("span", null,
                    'You are connected to',
                    React.createElement("label", { htmlFor: 'network', className: 'yearn--modalMobileMenu-select' },
                        React.createElement("select", { name: 'network', id: 'network', onChange: (e) => onSwitchChain(Number(e?.target?.value), true), className: 'yearn--select-no-arrow yearn--select-reset !pr-6 text-sm' }, optionsForSelect.map((id) => (React.createElement("option", { key: id, selected: chainID === id, value: id }, chains[id]?.displayName || `Unknown chain (${id})`)))),
                        React.createElement("div", { className: 'yearn--modalMobileMenu-chevron' },
                            React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 448 512' },
                                React.createElement("path", { d: 'M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z', fill: 'currentcolor' }))))))) : null,
            !shouldUseWallets || walletIdentity === 'Connect a wallet' ? null : (React.createElement("div", { className: 'yearn--modalMobileMenu-logout' },
                React.createElement("svg", { onClick: onDesactivate, xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
                    React.createElement("path", { d: 'M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256V32C224 14.33 238.3 0 256 0C273.7 0 288 14.33 288 32V256zM80 256C80 353.2 158.8 432 256 432C353.2 432 432 353.2 432 256C432 201.6 407.3 152.9 368.5 120.6C354.9 109.3 353 89.13 364.3 75.54C375.6 61.95 395.8 60.1 409.4 71.4C462.2 115.4 496 181.8 496 255.1C496 388.5 388.5 496 256 496C123.5 496 16 388.5 16 255.1C16 181.8 49.75 115.4 102.6 71.4C116.2 60.1 136.4 61.95 147.7 75.54C158.1 89.13 157.1 109.3 143.5 120.6C104.7 152.9 80 201.6 80 256z', fill: 'currentcolor' }))))),
        React.createElement("div", null, renderNotActive()),
        children ? (React.createElement(React.Fragment, null,
            shouldUseNetworks || shouldUseWallets ? (React.createElement("div", { className: 'yearn--modalMobileMenu-separatorWrapper' },
                React.createElement("div", { className: 'yearn--modalMobileMenu-separator' }))) : null,
            React.createElement("div", { className: 'yearn--modalMobileMenu-childrenWrapper' }, children))) : React.createElement("div", { className: 'yearn--modalMobileMenu-childrenWrapper' })));
}
export { ModalMobileMenu };
