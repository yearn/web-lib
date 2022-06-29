import	{useWeb3}				from	'../contexts/useWeb3';
import	type {TUseAccountRes}	from	'./types.d';

/* 🔵 - Yearn Finance ******************************************************
** This hook is really just a remapping of the useWeb3 context, providing
** a more friendly limited interface for dev experience.
**************************************************************************/
function useAccount(): TUseAccountRes {
	const {address, ens, isActive, isConnecting, isDisconnected, provider} = useWeb3();
  
	return ({
		address: address,
		ens: ens,
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

export default useAccount;
