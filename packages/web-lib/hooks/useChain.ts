import {chains, TChain} from '@yearn-finance/web-lib/utils/web3/chains';
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
		get: (chainID: number): TChain => {
			if(!chains[chainID]) {
				throw new Error(`Chain with id ${chainID} is not available`)
			}

			return chains[chainID];
		},
		getCurrent: (): TChain => {
			if(!chains[safeChainID]) {
				throw new Error(`Chain with id ${safeChainID} is not available`)
			}

			return chains[safeChainID];
		},
		getAll: () => chains
	};
}
