import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';

import type {TUseAccountRes} from '@yearn-finance/web-lib/hooks/types';

/* 🔵 - Yearn Finance ******************************************************
** This hook is really just a remapping of the useWeb3 context, providing
** a more friendly limited interface for dev experience.
**************************************************************************/
export function useAccount(): TUseAccountRes {
	const {address, ens, lensProtocolHandle, isActive, isConnecting, isDisconnected, provider} = useWeb3();

	return ({
		address: address,
		ens: ens,
		lensProtocolHandle: lensProtocolHandle,
		provider: provider,
		isConnecting: isConnecting,
		isReconnecting: isActive && isConnecting,
		isConnected: isActive,
		isDisconnected: isDisconnected,
		status: (
			isActive && isConnecting ? 'reconnecting' :
				isConnecting ? 'connecting' :
					isActive ? 'connected' :
						'disconnected'
		)
	});
}
