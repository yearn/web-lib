import React, { useMemo } from 'react';
import IconWalletCoinbase from '@yearn-finance/web-lib/icons/IconWalletCoinbase';
import IconWalletFrame from '@yearn-finance/web-lib/icons/IconWalletFrame';
import IconWalletMetamask from '@yearn-finance/web-lib/icons/IconWalletMetamask';
import IconWalletPhantom from '@yearn-finance/web-lib/icons/IconWalletPhantom';
import IconWalletTrustWallet from '@yearn-finance/web-lib/icons/IconWalletTrustWallet';
export function useInjectedWallet() {
    const detectedWalletProvider = useMemo(() => {
        if (typeof (window) !== 'undefined') {
            const ethereum = window?.ethereum;
            if (ethereum?.isCoinbaseBrowser) {
                return ({
                    name: 'Coinbase',
                    icon: React.createElement(IconWalletCoinbase, null),
                    type: 'EMBED_COINBASE'
                });
            }
            if (ethereum?.isCoinbaseWallet) {
                return ({
                    name: 'Coinbase',
                    icon: React.createElement(IconWalletCoinbase, null),
                    type: 'INJECTED'
                });
            }
            if (ethereum?.isFrame) {
                return ({
                    name: 'Frame',
                    icon: React.createElement(IconWalletFrame, null),
                    type: 'INJECTED'
                });
            }
            if (ethereum?.isPhantom) {
                return ({
                    name: 'Phantom',
                    icon: React.createElement(IconWalletPhantom, null),
                    type: 'INJECTED'
                });
            }
            if (ethereum?.isTrustWallet) {
                return ({
                    name: 'TrustWallet',
                    icon: React.createElement(IconWalletTrustWallet, null),
                    type: 'INJECTED'
                });
            }
            if (ethereum?.isTrust) {
                return ({
                    name: 'TrustWallet',
                    icon: React.createElement(IconWalletTrustWallet, null),
                    type: 'EMBED_TRUSTWALLET'
                });
            }
            if (ethereum?.isMetaMask) {
                return ({
                    name: 'Metamask',
                    icon: React.createElement(IconWalletMetamask, null),
                    type: 'INJECTED'
                });
            }
        }
        return ({
            name: 'Frame',
            icon: React.createElement(IconWalletFrame, { className: 'text-neutral-900' }),
            type: 'INJECTED'
        });
    }, [typeof (window)]);
    return (detectedWalletProvider);
}
