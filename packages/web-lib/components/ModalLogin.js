import React, { cloneElement } from 'react';
import { Modal } from '@yearn-finance/web-lib/components/Modal';
import { yToast } from '@yearn-finance/web-lib/components/yToast';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useInjectedWallet } from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletCoinbase from '@yearn-finance/web-lib/icons/IconWalletCoinbase';
import IconWalletGnosis from '@yearn-finance/web-lib/icons/IconWalletGnosis';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';
function ModalLogin(props) {
    const { isOpen, onClose } = props;
    const { onConnect } = useWeb3();
    const detectedWalletProvider = useInjectedWallet();
    const { toast } = yToast();
    return (React.createElement(Modal, { isOpen: isOpen, onClose: () => onClose() },
        React.createElement("div", { className: 'yearn--modalLogin' },
            React.createElement("div", { onClick: () => {
                    onConnect('INJECTED', () => toast({ content: 'Unsupported network. Please use Ethereum mainnet.', type: 'error' }), () => onClose());
                }, className: 'yearn--modalLogin-card' },
                React.createElement("div", null, cloneElement(detectedWalletProvider.icon)),
                React.createElement("b", null, detectedWalletProvider.name)),
            React.createElement("div", { onClick: () => {
                    onConnect('WALLET_CONNECT', () => toast({ content: 'Invalid chain', type: 'error' }), () => onClose());
                }, className: 'yearn--modalLogin-card' },
                React.createElement("div", null,
                    React.createElement(IconWalletWalletConnect, null)),
                React.createElement("b", null, 'WalletConnect')),
            React.createElement("div", { onClick: () => {
                    onConnect('EMBED_COINBASE', () => toast({ content: 'Invalid chain', type: 'error' }), () => onClose());
                }, className: 'yearn--modalLogin-card' },
                React.createElement("div", null,
                    React.createElement(IconWalletCoinbase, null)),
                React.createElement("b", null, 'Coinbase')),
            React.createElement("div", { onClick: () => {
                    onConnect('EMBED_GNOSIS_SAFE', () => toast({ content: 'Invalid chain', type: 'error' }), () => onClose());
                }, className: 'yearn--modalLogin-card' },
                React.createElement("div", null,
                    React.createElement(IconWalletGnosis, null)),
                React.createElement("b", null, 'Gnosis')))));
}
export { ModalLogin };
