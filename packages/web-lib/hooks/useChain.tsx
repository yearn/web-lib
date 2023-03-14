import {chains, TChain} from '@yearn-finance/web-lib/utils/web3/chains';
import { useCallback } from 'react';
import { TNDict } from '../utils/types';
import { useChainID } from './useChainID';

type TUseChainReturn = {
	get: (chainID: number) => TChain;
	getCurrent: () => TChain;
	getAll: () => TNDict<TChain>;
}

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to grab details about a network.
** It will return details of the network.
**************************************************************************/
export function useChain(): TUseChainReturn {
	const {safeChainID} = useChainID();

	return {
		get: useCallback((chainID: number): TChain => chains[chainID], []),
		getCurrent: useCallback((): TChain => chains[safeChainID], [safeChainID]),
		getAll: () => useCallback(() => chains, []),
	};
}
