import React, { cloneElement, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useInjectedWallet } from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletGnosis from '@yearn-finance/web-lib/icons/IconWalletGnosis';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';
import { truncateHex } from '@yearn-finance/web-lib/utils/address';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
function LoginStepWallet({ onFocus }) {
    const { onConnect } = useWeb3();
    const detectedWalletProvider = useInjectedWallet();
    return (React.createElement("div", { className: 'yearn--shadow overflow-hidden pt-4' },
        React.createElement("div", { className: 'flex flex-col space-y-2 px-4' },
            React.createElement("b", { className: 'flex text-xl text-neutral-900' }, 'Connect wallet')),
        React.createElement("div", { className: 'grid w-full grid-cols-1 py-4' },
            React.createElement("button", { className: 'group relative flex flex-row items-center py-2 px-4 transition-colors hover:bg-neutral-100', onClick: () => {
                    onFocus();
                    onConnect('INJECTED', (e) => console.error(e), () => undefined);
                } },
                React.createElement("div", { className: 'mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-neutral-200' }, cloneElement(detectedWalletProvider.icon, { className: 'h-6 w-6' })),
                React.createElement("b", null, detectedWalletProvider.name)),
            React.createElement("button", { className: 'group relative flex flex-row items-center py-2 px-4 transition-colors hover:bg-neutral-100', onClick: () => {
                    onFocus();
                    onConnect('WALLET_CONNECT', (e) => console.error(e), () => undefined);
                } },
                React.createElement("div", { className: 'mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-neutral-200' },
                    React.createElement(IconWalletWalletConnect, { className: 'h-6 w-6' })),
                React.createElement("b", null, 'WalletConnect')),
            React.createElement("button", { className: 'group relative flex flex-row items-center py-2 px-4 transition-colors hover:bg-neutral-100', onClick: () => {
                    onFocus();
                    onConnect('EMBED_GNOSIS_SAFE', (e) => console.error(e), () => undefined);
                } },
                React.createElement("div", { className: 'mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-neutral-200' },
                    React.createElement(IconWalletGnosis, { className: 'h-6 w-6' })),
                React.createElement("b", null, 'Gnosis')))));
}
function LoginPopover() {
    const { isActive, address, ens, onSwitchChain, onDesactivate } = useWeb3();
    const [walletIdentity, set_walletIdentity] = useState(undefined);
    const [isFocused, set_isFocused] = useState(false);
    const [isShowing, set_isShowing] = useState(false);
    const [isInit, set_isInit] = useState(false);
    useEffect(() => {
        set_isInit(true);
    }, []);
    useEffect(() => {
        if (!isActive && address) {
            set_walletIdentity('Invalid Network');
        }
        else if (address && !ens) {
            set_walletIdentity(truncateHex(address, 6));
        }
        else if (address && ens) {
            set_walletIdentity(ens);
        }
        else if (address) {
            set_walletIdentity(truncateHex(address, 6));
        }
        else {
            set_walletIdentity('Connect Wallet');
        }
    }, [ens, address, isActive]);
    function onDisconnect() {
        performBatchedUpdates(() => {
            set_isFocused(false);
            set_isShowing(false);
            onDesactivate();
        });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: isShowing || isFocused ? 'fixed inset-0 z-40' : 'hidden', "aria-hidden": true, onClick: () => {
                performBatchedUpdates(() => {
                    set_isShowing(false);
                    set_isFocused(false);
                });
            } }),
        React.createElement("div", { className: 'relative z-50' },
            React.createElement(Popover, { onMouseEnter: () => set_isShowing(true), onMouseLeave: () => !isFocused ? set_isShowing(false) : undefined },
                React.createElement("div", { suppressHydrationWarning: true, className: 'yearn--header-nav-item' },
                    React.createElement(Popover.Button, { onClick: () => {
                            if (!isActive && address) {
                                onSwitchChain(1, true);
                            }
                            else if (isActive) {
                                onDisconnect();
                            }
                        } },
                        React.createElement("div", { suppressHydrationWarning: true }, !isInit ? 'Connect wallet' : isActive ? walletIdentity : 'Connect wallet'))),
                React.createElement(Transition, { as: 'span', appear: true, unmount: false, show: isShowing, enter: 'transition ease-out duration-200', enterFrom: 'opacity-0 translate-y-1', enterTo: 'opacity-100 translate-y-0', leave: 'transition ease-in duration-200', leaveFrom: 'opacity-100 translate-y-0', leaveTo: 'opacity-0 translate-y-1' },
                    React.createElement(Popover.Panel, { className: 'absolute right-0 top-4 z-[1000] mt-3 w-screen max-w-[300px] md:-right-4 md:pt-2' }, !isActive ? (React.createElement(LoginStepWallet, { onFocus: () => set_isFocused(true) })) : null))))));
}
export default LoginPopover;
