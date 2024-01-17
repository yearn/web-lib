import {useWeb3} from '@builtbymom/web3/contexts/useWeb3';
import {useFetch} from '@builtbymom/web3/hooks/useFetch';
import {useDeepCompareMemo} from '@react-hookz/web';

import {useYDaemonBaseURI} from '../hooks/useYDaemonBaseURI';
import {yDaemonEarnedSchema} from '../utils/schemas/yDaemonEarnedSchema';

import type {TYDaemonEarned} from '../utils/schemas/yDaemonEarnedSchema';

function useYearnEarned(): TYDaemonEarned {
	const {address} = useWeb3();
	const {yDaemonBaseUri: yDaemonBaseUriWithoutChain} = useYDaemonBaseURI();

	const {data: earned} = useFetch<TYDaemonEarned>({
		endpoint: address
			? `${yDaemonBaseUriWithoutChain}/earned/${address}?${new URLSearchParams({
					chainIDs: [1, 10].join(',')
			  })}`
			: null,
		schema: yDaemonEarnedSchema
	});

	const memorizedEarned = useDeepCompareMemo((): TYDaemonEarned => {
		if (!earned) {
			return {
				earned: {},
				totalRealizedGainsUSD: 0,
				totalUnrealizedGainsUSD: 0
			};
		}
		return earned;
	}, [earned]);

	return memorizedEarned;
}

export {useYearnEarned};
