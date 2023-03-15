import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {chains} from '@yearn-finance/web-lib/utils/web3/chains';

import type {Maybe, TNDict} from '@yearn-finance/web-lib/types';
import type {TChain} from '@yearn-finance/web-lib/utils/web3/chains';

type TUseChainReturn = {
	get: (chainID: number) => Maybe<TChain>;
	getCurrent: () => Maybe<TChain>;
	getAll: () => TNDict<TChain>;
}

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to grab details about a network.
** It will return details of the network.
**************************************************************************/
export function useChain(): TUseChainReturn {
	const {safeChainID} = useChainID();

	return {
		get: (chainID: number): Maybe<TChain> => chains[chainID],
		getCurrent: (): Maybe<TChain> => chains[safeChainID],
		getAll: (): TNDict<TChain> => chains
	};
}
