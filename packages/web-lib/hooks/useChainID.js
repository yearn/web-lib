import { useMemo } from 'react';
import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
export function useChainID(defaultChainID) {
    const { chainID, onSwitchChain } = useWeb3();
    const safeChainID = useMemo(() => [1337, 31337].includes(chainID) ? 1 : chainID || 1, [chainID]);
    return ({
        chainID: Number(chainID || defaultChainID || 1),
        updateChainID: onSwitchChain,
        safeChainID
    });
}
