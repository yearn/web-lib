import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { deepMerge } from '@yearn-finance/web-lib/contexts/utils';
import { useLocalStorage } from '@yearn-finance/web-lib/hooks/useLocalStorage';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import { getRPC, replaceEnvRPCURI } from '@yearn-finance/web-lib/utils/web3/providers';
import { toAddress } from '../utils/address';
const defaultSettings = {
    yDaemonBaseURI: 'https://ydaemon.yearn.finance',
    metaBaseURI: 'https://meta.yearn.finance',
    apiBaseURI: 'https://api.yearn.finance'
};
const defaultNetworks = {
    1: {
        rpcURI: getRPC(1),
        graphURI: 'https://api.thegraph.com/subgraphs/name/0xkofee/yearn-vaults-v2',
        yDaemonURI: `${defaultSettings.yDaemonBaseURI}/1`,
        metaURI: `${defaultSettings.metaBaseURI}/api/1`,
        apiURI: `${defaultSettings.apiBaseURI}/v1/chains/1`,
        explorerBaseURI: 'https://etherscan.io',
        lensAddress: toAddress('0x83d95e0D5f402511dB06817Aff3f9eA88224B030'),
        partnerContractAddress: toAddress('0x8ee392a4787397126C163Cb9844d7c447da419D8')
    },
    10: {
        rpcURI: getRPC(10),
        graphURI: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-optimism',
        yDaemonURI: `${defaultSettings.yDaemonBaseURI}/10`,
        metaURI: `${defaultSettings.metaBaseURI}/api/10`,
        apiURI: `${defaultSettings.apiBaseURI}/v1/chains/10`,
        explorerBaseURI: 'https://optimistic.etherscan.io',
        lensAddress: toAddress('0xB082d9f4734c535D9d80536F7E87a6f4F471bF65'),
        partnerContractAddress: toAddress(ethers.constants.AddressZero)
    },
    250: {
        rpcURI: getRPC(250),
        graphURI: 'https://api.thegraph.com/subgraphs/name/bsamuels453/yearn-fantom-validation-grafted',
        yDaemonURI: `${defaultSettings.yDaemonBaseURI}/250`,
        metaURI: `${defaultSettings.metaBaseURI}/api/250`,
        apiURI: `${defaultSettings.apiBaseURI}/v1/chains/250`,
        explorerBaseURI: 'https://ftmscan.com',
        lensAddress: toAddress('0x57AA88A0810dfe3f9b71a9b179Dd8bF5F956C46A'),
        partnerContractAddress: toAddress('0x086865B2983320b36C42E48086DaDc786c9Ac73B')
    },
    42161: {
        rpcURI: getRPC(42161),
        graphURI: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-arbitrum',
        yDaemonURI: `${defaultSettings.yDaemonBaseURI}/42161`,
        metaURI: `${defaultSettings.metaBaseURI}/api/42161`,
        apiURI: `${defaultSettings.apiBaseURI}/v1/chains/42161`,
        explorerBaseURI: 'https://arbiscan.io',
        lensAddress: toAddress('0x043518AB266485dC085a1DB095B8d9C2Fc78E9b9'),
        partnerContractAddress: toAddress(ethers.constants.AddressZero)
    },
    1337: {
        rpcURI: getRPC(1337),
        graphURI: 'https://api.thegraph.com/subgraphs/name/0xkofee/yearn-vaults-v2',
        yDaemonURI: `${defaultSettings.yDaemonBaseURI}/1`,
        metaURI: `${defaultSettings.metaBaseURI}/api/1`,
        apiURI: `${defaultSettings.apiBaseURI}/v1/chains/1`,
        explorerBaseURI: 'https://etherscan.io',
        lensAddress: toAddress('0x83d95e0D5f402511dB06817Aff3f9eA88224B030'),
        partnerContractAddress: toAddress('0x8ee392a4787397126C163Cb9844d7c447da419D8')
    }
};
const SettingsContext = createContext({
    settings: defaultSettings,
    networks: defaultNetworks,
    onUpdateNetworks: () => null,
    onUpdateBaseSettings: () => null
});
export const SettingsContextApp = ({ children, baseOptions = defaultSettings, networksOptions = {} }) => {
    const [baseSettings, set_baseSettings] = useLocalStorage('yearnSettingsBase', deepMerge(defaultSettings, baseOptions), { currentVersion: 1, shouldMigratePreviousVersion: true });
    const [networks, set_networks] = useLocalStorage('yearnSettingsNetworks', deepMerge(defaultNetworks, networksOptions), { currentVersion: 1, shouldMigratePreviousVersion: true });
    useEffect(() => {
        const _networks = networks;
        Object.keys(_networks).forEach((key) => {
            replaceEnvRPCURI(Number(key), _networks[Number(key)]?.rpcURI || '');
        });
    }, [networks]);
    const onUpdateNetworks = useCallback((newNetworkSettings) => {
        const _networks = deepMerge(networks, newNetworkSettings);
        Object.keys(_networks).forEach((key) => {
            replaceEnvRPCURI(Number(key), _networks[Number(key)]?.rpcURI || '');
        });
        set_networks(_networks);
    }, [networks]);
    const onUpdateBaseSettings = useCallback((newSettings) => {
        performBatchedUpdates(() => {
            set_baseSettings(newSettings);
            set_networks((prevNetworks) => {
                Object.keys(prevNetworks).forEach((key) => {
                    prevNetworks[Number(key)].yDaemonURI = `${newSettings.yDaemonBaseURI}/${key}`;
                    prevNetworks[Number(key)].metaURI = `${newSettings.metaBaseURI}/api/${key}`;
                    prevNetworks[Number(key)].apiURI = `${newSettings.apiBaseURI}/v1/chains/${key}`;
                });
                return prevNetworks;
            });
        });
    }, []);
    const contextValue = useMemo(() => ({
        settings: baseSettings,
        networks: networks,
        onUpdateNetworks: onUpdateNetworks,
        onUpdateBaseSettings: onUpdateBaseSettings
    }), [baseSettings, networks, onUpdateNetworks, onUpdateBaseSettings]);
    return (React.createElement(SettingsContext.Provider, { value: contextValue }, children));
};
export const useSettings = () => useContext(SettingsContext);
export default useSettings;
