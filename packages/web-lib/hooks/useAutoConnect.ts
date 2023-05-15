import {useEffect} from 'react';
import {useConnect} from 'wagmi';

const AUTOCONNECTED_CONNECTOR_IDS = ['safe'];

function useAutoConnect(): void {
	const {connect, connectors, error, isError, isIdle, isLoading, isSuccess} = useConnect();

	console.log({error, isError, isIdle, isLoading, isSuccess, connectors});
	useEffect((): void => {
		AUTOCONNECTED_CONNECTOR_IDS.forEach((connector): void => {
			const connectorInstance = connectors.find((c): boolean => c.id === connector && c.ready);
			console.log(connectorInstance, connector);

			if (connectorInstance) {
				connect({connector: connectorInstance, chainId: 1});
			}
		});
	}, [connect, connectors]);
}

export {useAutoConnect};
