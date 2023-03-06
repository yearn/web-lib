import {useMemo} from 'react';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {chains} from '@yearn-finance/web-lib/utils/web3/chains';

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to grab the explorer of the current network.
** It will return the address of the network explorer.
**************************************************************************/
export function useExplorer(): string {
	const {safeChainID} = useChainID();

	return useMemo((): string => chains[safeChainID].block_explorer, [safeChainID]);
}
