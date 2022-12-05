import {useCallback, useEffect, useRef, useState} from 'react';
import {ethers} from 'ethers';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import {getProvider} from '@yearn-finance/web-lib/utils/providers';

import type * as Types from './types';

const	defaultStatus = {
	isLoading: false,
	isSuccess: false,
	isError: false
};
const	defaultData = {
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

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to fetch the latest or any past block's
** information. This could also be used to subscribe to new blocks and be
** able to trigger events based on that.
**************************************************************************/
export function useBlock(props?: Types.TUseBlockReq): Types.TUseBlockRes {
	const	{provider, chainID: web3ChainID} = useWeb3();
	const	lastBlock = useRef<number>(0);
	const	[data, set_data] = useState<Types.TBlock>(defaultData);
	const	[status, set_status] = useState<Types.TDefaultMinimalStatus>(defaultStatus);
	const	[error, set_error] = useState<Error | undefined>(undefined);

	const getBlockDetails = useCallback(async (
		blockNumber: ethers.providers.BlockTag,
		shallow?: boolean
	): Promise<void> => {
		let		currentProvider = props?.provider || getProvider(props?.chainID || web3ChainID || 1);
		if (!props?.provider && props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.Provider;
		}

		if (!shallow) {
			set_status({...defaultStatus, isLoading: true});
		}

		currentProvider
			.getBlock(blockNumber)
			.then((block: ethers.providers.Block): void => {
				if (lastBlock.current <= block.number) {
					return;
				}
				lastBlock.current = block.number;
				if (shallow) {
					if (!props?.shallowCallback) {
						console.warn('[Yearn Web Lib - useBlock] Please provide a shallowCallback function to use shallowWatch.');
					} else {
						props.shallowCallback(block, undefined);
					}
				} else {
					performBatchedUpdates((): void => {
						set_data(block);
						set_status({...defaultStatus, isSuccess: true});
						set_error(undefined);
					});
				}
			})
			.catch((_error: Error): void => {
				if (shallow) {
					if (!props?.shallowCallback) {
						console.warn('[Yearn Web Lib - useBlock] Please provide a shallowCallback function to use shallowWatch.');
					} else {
						props.shallowCallback(defaultData, _error);
					}

				} else {
					performBatchedUpdates((): void => {
						set_status({...defaultStatus, isError: true});
						set_error(_error);
					});
				}
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props?.chainID, props?.provider, provider, web3ChainID]);

	/* 🔵 - Yearn Finance ******************************************************
	** When this hook is called, it will fetch the latest block by default, or
	** any provided block number.
	**************************************************************************/
	useEffect((): void => {
		getBlockDetails(props?.blockHashOrBlockTag || 'latest');
	}, [getBlockDetails, props?.blockHashOrBlockTag]);

	/* 🔵 - Yearn Finance ******************************************************
	** If the shouldWatch props is specified, the hook will loop and watch for
	** any new blocks, updating data as they are added.
	**************************************************************************/
	useEffect((): () => void => {
		if (!props?.shouldWatch && !props?.shouldShallowWatch) {
			return (): void => undefined;
		}

		let	currentProvider = props?.provider || getProvider(props?.chainID || web3ChainID || 1);
		if (!props?.provider && props?.chainID === web3ChainID && provider) {
			currentProvider = provider as ethers.providers.BaseProvider | ethers.providers.Web3Provider;
		}
		currentProvider.on('block', (blockNumber: number): void => {
			getBlockDetails(blockNumber, props?.shouldShallowWatch);
		});

		return (): void => {
			currentProvider.off('block', (blockNumber: number): void => {
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
