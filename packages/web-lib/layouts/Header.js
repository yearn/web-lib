import React, { useEffect, useState } from 'react';
import { Card } from '@yearn-finance/web-lib/components/Card';
import { Dropdown } from '@yearn-finance/web-lib/components/Dropdown';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import IconNetworkArbitrum from '@yearn-finance/web-lib/icons/IconNetworkArbitrum';
import IconNetworkEthereum from '@yearn-finance/web-lib/icons/IconNetworkEthereum';
import IconNetworkFantom from '@yearn-finance/web-lib/icons/IconNetworkFantom';
import IconNetworkOptimism from '@yearn-finance/web-lib/icons/IconNetworkOptimism';
import { truncateHex } from '@yearn-finance/web-lib/utils/address';
const options = [
    { icon: React.createElement(IconNetworkEthereum, null), label: 'Ethereum', value: 1 },
    { icon: React.createElement(IconNetworkOptimism, null), label: 'Optimism', value: 10 },
    { icon: React.createElement(IconNetworkFantom, null), label: 'Fantom', value: 250 },
    { icon: React.createElement(IconNetworkArbitrum, null), label: 'Arbitrum', value: 42161 }
];
function Header({ shouldUseWallets = true, shouldUseNetworks = true, children }) {
    const { onSwitchChain, isActive, address, ens, openLoginModal, onDesactivate } = useWeb3();
    const { chainID } = useChainID();
    const [walletIdentity, set_walletIdentity] = useState('Connect wallet');
    const [selectedOption, set_selectedOption] = useState(options[0]);
    useEffect(() => {
        if (!isActive) {
            set_walletIdentity('Connect wallet');
        }
        else if (ens) {
            set_walletIdentity(ens);
        }
        else if (address) {
            set_walletIdentity(truncateHex(address, 4));
        }
        else {
            set_walletIdentity('Connect wallet');
        }
    }, [ens, address, isActive]);
    useEffect(() => {
        const _selectedOption = options.find((e) => e.value === Number(chainID)) || options[0];
        set_selectedOption(_selectedOption);
    }, [chainID, isActive]);
    return (React.createElement("header", { className: 'z-30 mx-auto w-full py-4' },
        React.createElement(Card, { className: 'flex h-auto items-center justify-between md:h-20' },
            React.createElement("div", { className: 'flex w-full flex-row items-center' }, children),
            React.createElement("div", { className: 'flex flex-row items-center space-x-4' },
                shouldUseNetworks ? (React.createElement("div", { className: 'hidden flex-row items-center space-x-4 md:flex' },
                    React.createElement(Dropdown, { defaultOption: options[0], options: options, selected: selectedOption, onSelect: (option) => onSwitchChain(option.value, true) }))) : null,
                shouldUseWallets ? (React.createElement("button", { onClick: () => {
                        if (isActive) {
                            onDesactivate();
                        }
                        else {
                            openLoginModal();
                        }
                    }, "data-variant": 'light', className: 'yearn--button truncate' }, walletIdentity)) : null))));
}
export { Header };
