import { useCallback, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import { getProvider } from '@yearn-finance/web-lib/utils/web3/providers';
const defaultStatus = {
    isLoading: false,
    isSuccess: false,
    isError: false
};
const defaultData = {
    hash: '',
    parentHash: '',
    miner: '',
    extraData: '',
    nonce: '',
    number: 0,
    timestamp: 0,
    difficulty: 0,
    gasLimit: ethers.constants.Zero,
    gasUsed: ethers.constants.Zero,
    baseFeePerGas: null
};
export function useBlock(props) {
    const { provider } = useWeb3();
    const { chainID: web3ChainID } = useChainID();
    const lastBlock = useRef(0);
    const [data, set_data] = useState(defaultData);
    const [status, set_status] = useState(defaultStatus);
    const [error, set_error] = useState(undefined);
    const getBlockDetails = useCallback(async (blockNumber, shallow) => {
        let currentProvider = props?.provider || getProvider(props?.chainID || web3ChainID || 1);
        if (!props?.provider && props?.chainID === web3ChainID && provider) {
            currentProvider = provider;
        }
        if (!shallow) {
            set_status({ ...defaultStatus, isLoading: true });
        }
        currentProvider
            .getBlock(blockNumber)
            .then((block) => {
            if (lastBlock.current <= block.number) {
                return;
            }
            lastBlock.current = block.number;
            if (shallow) {
                if (!props?.shallowCallback) {
                    console.warn('[Yearn Web Lib - useBlock] Please provide a shallowCallback function to use shallowWatch.');
                }
                else {
                    props.shallowCallback(block, undefined);
                }
            }
            else {
                performBatchedUpdates(() => {
                    set_data(block);
                    set_status({ ...defaultStatus, isSuccess: true });
                    set_error(undefined);
                });
            }
        })
            .catch((_error) => {
            if (shallow) {
                if (!props?.shallowCallback) {
                    console.warn('[Yearn Web Lib - useBlock] Please provide a shallowCallback function to use shallowWatch.');
                }
                else {
                    props.shallowCallback(defaultData, _error);
                }
            }
            else {
                performBatchedUpdates(() => {
                    set_status({ ...defaultStatus, isError: true });
                    set_error(_error);
                });
            }
        });
    }, [props?.chainID, props?.provider, provider, web3ChainID]);
    useEffect(() => {
        getBlockDetails(props?.blockHashOrBlockTag || 'latest');
    }, [getBlockDetails, props?.blockHashOrBlockTag]);
    useEffect(() => {
        if (!props?.shouldWatch && !props?.shouldShallowWatch) {
            return () => undefined;
        }
        let currentProvider = props?.provider || getProvider(props?.chainID || web3ChainID || 1);
        if (!props?.provider && props?.chainID === web3ChainID && provider) {
            currentProvider = provider;
        }
        currentProvider.on('block', (blockNumber) => {
            getBlockDetails(blockNumber, props?.shouldShallowWatch);
        });
        return () => {
            currentProvider.off('block', (blockNumber) => {
                getBlockDetails(blockNumber, props?.shouldShallowWatch);
            });
        };
    }, [provider, props?.chainID, props?.provider, web3ChainID, props?.shouldWatch, props?.shouldShallowWatch, getBlockDetails]);
    return ({
        data: data,
        error,
        isLoading: status.isLoading,
        isSuccess: status.isSuccess,
        isError: status.isError
    });
}
