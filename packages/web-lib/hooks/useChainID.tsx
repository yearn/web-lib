import {useMemo} from 'react';
import {useWeb3React} from '@web3-react/core';

import {useClientEffect} from './useClientEffect';
import {useLocalStorage} from './useLocalStorage';

export type TUseChainIDRes = {
	chainID: number;
	updateChainID: (n: number) => void;
	safeChainID: number;
}

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to grab the current injected wallet provider.
** It will return the name and icon of the wallet provider.
**************************************************************************/
export function useChainID(defaultChainID?: number): TUseChainIDRes {
	const   {chainId} = useWeb3React();
	const	[chainID, set_chainID] = useLocalStorage('chainId', chainId) as [number, (n: number) => void];
	const	safeChainID = useMemo((): number => [1337, 31337].includes(chainID) ? 1 : chainID || 1, [chainID]);

	useClientEffect((): void => {
		if ((chainId || 0) > 0) {
			set_chainID(Number(chainId));
		} else if (chainId === 0) {
			set_chainID(Number(defaultChainID || 1));
		}
	}, [chainId]);

	return ({
		chainID: Number(chainID || defaultChainID || 1),
		updateChainID: set_chainID,
		safeChainID
	});
}
