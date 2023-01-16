import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { EIP1193 } from '@yearn-finance/web-lib/utils/web3/connectors.eip1193';
import { getRPC } from '@yearn-finance/web-lib/utils/web3/providers';
const [metaMaskConnector, metaMaskHooks] = initializeConnector((actions) => new MetaMask({ actions }));
const [walletConnectConnector, walletConnectHooks] = initializeConnector((actions) => new WalletConnect({
    actions,
    options: {
        rpc: {
            1: getRPC(1),
            4: getRPC(4),
            10: getRPC(10),
            250: getRPC(250),
            420: getRPC(420),
            1337: getRPC(1337),
            31337: getRPC(31337)
        }
    }
}));
const [eip1193Connector, eip1193Hooks] = initializeConnector((actions) => new EIP1193({
    actions,
    provider: undefined
}));
const [gnosisSafeConnector, gnosisSafeHooks] = initializeConnector((actions) => new GnosisSafe({
    actions,
    options: { allowedDomains: [/gnosis-safe.io/, /app.safe.global/] }
}));
const [coinbaseConnector, coinbaseHooks] = initializeConnector((actions) => new CoinbaseWallet({
    actions,
    options: {
        url: getRPC(1),
        appName: process.env.WEBSITE_TITLE
    }
}));
export const connectors = {
    metamask: {
        connector: metaMaskConnector,
        hooks: metaMaskHooks
    },
    walletConnect: {
        connector: walletConnectConnector,
        hooks: walletConnectHooks
    },
    eip1193: {
        connector: eip1193Connector,
        hooks: eip1193Hooks
    },
    gnosisSafe: {
        connector: gnosisSafeConnector,
        hooks: gnosisSafeHooks
    },
    coinbase: {
        connector: coinbaseConnector,
        hooks: coinbaseHooks
    }
};
