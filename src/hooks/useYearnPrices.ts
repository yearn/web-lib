import {useFetch} from '@builtbymom/web3/hooks/useFetch';
import {useDeepCompareMemo} from '@react-hookz/web';

import {useYDaemonBaseURI} from '../hooks/useYDaemonBaseURI';
import {yDaemonPricesChainSchema} from '../utils/schemas/yDaemonPricesSchema';

import type {TYDaemonPricesChain} from '../utils/schemas/yDaemonPricesSchema';

function useYearnPrices(): TYDaemonPricesChain {
	const {yDaemonBaseUri: yDaemonBaseUriWithoutChain} = useYDaemonBaseURI();
	const {data: prices} = useFetch<TYDaemonPricesChain>({
		endpoint: `${yDaemonBaseUriWithoutChain}/prices/all`,
		schema: yDaemonPricesChainSchema
	});

	const pricesUpdated = useDeepCompareMemo((): TYDaemonPricesChain => {
		if (!prices) {
			return {};
		}
		return prices;
	}, [prices]);

	return pricesUpdated;
}

export {useYearnPrices};
