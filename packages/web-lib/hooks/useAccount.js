import { useWeb3 } from '@yearn-finance/web-lib/contexts/useWeb3';
export function useAccount() {
    const { address, ens, isActive, isConnecting, isDisconnected, provider } = useWeb3();
    return ({
        address: address,
        ens: ens,
        provider: provider,
        isConnecting: isConnecting,
        isReconnecting: isActive && isConnecting,
        isConnected: isActive,
        isDisconnected: isDisconnected,
        status: (isActive && isConnecting ? 'reconnecting' :
            isConnecting ? 'connecting' :
                isActive ? 'connected' :
                    'disconnected')
    });
}
