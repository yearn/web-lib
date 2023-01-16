import { useMemo } from 'react';
import { chains } from '@yearn-finance/web-lib/utils/web3/chains';
import { useChainID } from './useChainID';
export function useExplorer() {
    const { safeChainID } = useChainID();
    return useMemo(() => chains[safeChainID].block_explorer, [safeChainID]);
}
