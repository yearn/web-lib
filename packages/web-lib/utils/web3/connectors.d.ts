import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { EIP1193 } from '@yearn-finance/web-lib/utils/web3/connectors.eip1193';
import type { Web3ReactHooks } from '@web3-react/core';
export type TConnector = {
    metamask: {
        connector: MetaMask;
        hooks: Web3ReactHooks;
    };
    walletConnect: {
        connector: WalletConnect;
        hooks: Web3ReactHooks;
    };
    eip1193: {
        connector: EIP1193;
        hooks: Web3ReactHooks;
    };
    gnosisSafe: {
        connector: GnosisSafe;
        hooks: Web3ReactHooks;
    };
    coinbase: {
        connector: CoinbaseWallet;
        hooks: Web3ReactHooks;
    };
};
export declare const connectors: TConnector;
