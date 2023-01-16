import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Contract } from 'ethcall';
import { ethers } from 'ethers';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import ERC20_ABI from '@yearn-finance/web-lib/utils/abi/erc20.abi';
import { toAddress } from '@yearn-finance/web-lib/utils/address';
import { ETH_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS } from '@yearn-finance/web-lib/utils/constants';
import * as format from '@yearn-finance/web-lib/utils/format';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import * as providers from '@yearn-finance/web-lib/utils/web3/providers';
const defaultStatus = {
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    isFetched: false,
    isRefetching: false
};
export function useBalances(props) {
    const { address: web3Address, isActive, provider } = useWeb3();
    const { chainID: web3ChainID } = useChainID();
    const [nonce, set_nonce] = useState(0);
    const [status, set_status] = useState(defaultStatus);
    const [error, set_error] = useState(undefined);
    const [balances, set_balances] = useState({});
    const data = useRef({ nonce: 0, address: toAddress(), balances: {} });
    const interval = useRef();
    const effectDependencies = props?.effectDependencies || [];
    const stringifiedTokens = useMemo(() => JSON.stringify(props?.tokens || []), [props?.tokens]);
    const getBalances = useCallback(async (tokenList) => {
        const tokens = JSON.parse(tokenList) || [];
        if (!isActive || !web3Address || tokens.length === 0) {
            return [{}, undefined];
        }
        let currentProvider = provider || providers.getProvider(props?.chainID || web3ChainID || 1);
        if (props?.chainID && props.chainID !== web3ChainID) {
            currentProvider = providers.getProvider(props?.chainID);
        }
        const calls = [];
        const ethcallProvider = await providers.newEthCallProvider(currentProvider);
        for (const element of tokens) {
            const { token } = element;
            const ownerAddress = (element?.for || web3Address);
            const isEth = toAddress(token) === ETH_TOKEN_ADDRESS;
            if (isEth) {
                const tokenContract = new Contract(WETH_TOKEN_ADDRESS, ERC20_ABI);
                calls.push(ethcallProvider.getEthBalance(ownerAddress), tokenContract.decimals(), tokenContract.symbol());
            }
            else {
                const tokenContract = new Contract(token, ERC20_ABI);
                calls.push(tokenContract.balanceOf(ownerAddress), tokenContract.decimals(), tokenContract.symbol());
            }
        }
        const _data = {};
        try {
            const results = await ethcallProvider.tryAll(calls);
            let rIndex = 0;
            for (const element of tokens) {
                const { token } = element;
                const balanceOf = results[rIndex++];
                const decimals = results[rIndex++];
                const rawPrice = format.BN(props?.prices?.[toAddress(token)] || ethers.constants.Zero);
                let symbol = results[rIndex++];
                if (toAddress(token) === ETH_TOKEN_ADDRESS) {
                    symbol = 'ETH';
                }
                _data[toAddress(token)] = {
                    decimals: Number(decimals),
                    symbol: symbol,
                    raw: balanceOf,
                    rawPrice,
                    normalized: format.toNormalizedValue(balanceOf, Number(decimals)),
                    normalizedPrice: format.toNormalizedValue(rawPrice, 6),
                    normalizedValue: (format.toNormalizedValue(balanceOf, Number(decimals)) * format.toNormalizedValue(rawPrice, 6))
                };
            }
            return [_data, undefined];
        }
        catch (_error) {
            return [{}, _error];
        }
    }, [isActive, web3Address, props?.chainID, props?.prices, web3ChainID, provider, ...effectDependencies]);
    useEffect(() => {
        if (props?.refreshEvery && props?.refreshEvery !== 'block') {
            let delay = props.refreshEvery;
            if (delay === 'second') {
                delay = 1 * 1000;
            }
            else if (delay === 'minute') {
                delay = 60 * 1000;
            }
            else if (delay === 'hour') {
                delay = 60 * 60 * 1000;
            }
            interval.current = setInterval(() => {
                getBalances(stringifiedTokens);
            }, delay);
            return () => clearInterval(interval.current);
        }
        return () => undefined;
    }, [getBalances, props?.refreshEvery, stringifiedTokens]);
    useEffect(() => {
        if (!props?.refreshEvery || props?.refreshEvery !== 'block') {
            return () => undefined;
        }
        let currentProvider = props?.provider || providers.getProvider(props?.chainID || web3ChainID || 1);
        if (!props?.provider && props?.chainID === web3ChainID && provider) {
            currentProvider = provider;
        }
        currentProvider.on('block', async () => getBalances(stringifiedTokens));
        return () => {
            currentProvider.off('block', async () => getBalances(stringifiedTokens));
        };
    }, [provider, props?.chainID, props?.provider, props?.refreshEvery, web3ChainID, getBalances, stringifiedTokens]);
    const onUpdate = useCallback(async () => {
        set_status({ ...defaultStatus, isLoading: true, isFetching: true, isRefetching: defaultStatus.isFetched });
        const [newRawData, err] = await getBalances(stringifiedTokens);
        if (toAddress(web3Address) !== data.current.address) {
            data.current.balances = {};
        }
        data.current.address = toAddress(web3Address);
        for (const [address, element] of Object.entries(newRawData)) {
            data.current.balances[address] = {
                ...data.current.balances[address],
                ...element
            };
        }
        data.current.nonce += 1;
        performBatchedUpdates(() => {
            set_nonce((n) => n + 1);
            set_balances(data.current.balances);
            set_error(err);
            set_status({ ...defaultStatus, isSuccess: true, isFetched: true });
        });
        return data.current.balances;
    }, [getBalances, stringifiedTokens, web3Address]);
    const onUpdateSome = useCallback(async (tokenList) => {
        set_status({ ...defaultStatus, isLoading: true, isFetching: true, isRefetching: defaultStatus.isFetched });
        const stringifiedSomeTokens = JSON.stringify(tokenList);
        const [newRawData, err] = await getBalances(stringifiedSomeTokens);
        if (toAddress(web3Address) !== data.current.address) {
            data.current.balances = {};
        }
        data.current.address = toAddress(web3Address);
        for (const [address, element] of Object.entries(newRawData)) {
            data.current.balances[address] = {
                ...data.current.balances[address],
                ...element
            };
        }
        data.current.nonce += 1;
        performBatchedUpdates(() => {
            set_nonce((n) => n + 1);
            set_balances(data.current.balances);
            set_error(err);
            set_status({ ...defaultStatus, isSuccess: true, isFetched: true });
        });
        return data.current.balances;
    }, [getBalances, web3Address]);
    const assignPrices = useCallback((_rawData) => {
        for (const key of Object.keys(_rawData)) {
            const tokenAddress = toAddress(key);
            const rawPrice = format.BN(props?.prices?.[tokenAddress] || ethers.constants.Zero);
            _rawData[tokenAddress] = {
                ..._rawData[tokenAddress],
                rawPrice,
                normalizedPrice: format.toNormalizedValue(rawPrice, 6),
                normalizedValue: ((_rawData?.[tokenAddress] || 0).normalized * format.toNormalizedValue(rawPrice, 6))
            };
        }
        return _rawData;
    }, [props?.prices]);
    useEffect(() => {
        onUpdate();
    }, [onUpdate]);
    const contextValue = useMemo(() => ({
        data: assignPrices(balances),
        nonce,
        update: onUpdate,
        updateSome: onUpdateSome,
        error,
        isLoading: status.isLoading,
        isFetching: status.isFetching,
        isSuccess: status.isSuccess,
        isError: status.isError,
        isFetched: status.isFetched,
        isRefetching: status.isRefetching,
        status: (status.isError ? 'error' :
            (status.isLoading || status.isFetching) ? 'loading' :
                (status.isSuccess) ? 'success' : 'unknown')
    }), [assignPrices, balances, error, nonce, onUpdate, onUpdateSome, status.isError, status.isFetched, status.isFetching, status.isLoading, status.isRefetching, status.isSuccess]);
    return (contextValue);
}
