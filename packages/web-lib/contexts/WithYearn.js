import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { SettingsContextApp } from '@yearn-finance/web-lib/contexts/useSettings';
import { UIContextApp } from '@yearn-finance/web-lib/contexts/useUI';
import { Web3ContextApp } from '@yearn-finance/web-lib/contexts/useWeb3';
import { connectors } from '@yearn-finance/web-lib/utils/web3/connectors';
function WithYearn({ children, options }) {
    const web3Connectors = [
        [connectors.metamask.connector, connectors.metamask.hooks],
        [connectors.walletConnect.connector, connectors.walletConnect.hooks],
        [connectors.eip1193.connector, connectors.eip1193.hooks],
        [connectors.gnosisSafe.connector, connectors.gnosisSafe.hooks],
        [connectors.coinbase.connector, connectors.coinbase.hooks]
    ];
    return (React.createElement(UIContextApp, { options: options?.ui },
        React.createElement(SettingsContextApp, { networksOptions: options?.networks, baseOptions: options?.baseSettings },
            React.createElement(Web3ReactProvider, { connectors: web3Connectors, lookupENS: false },
                React.createElement(Web3ContextApp, { options: options?.web3 }, children)))));
}
export { WithYearn };
