import {useMemo} from 'react';
import {useNetwork} from 'wagmi';

function useSupportedChainsID(): number[] {
	const {chains} = useNetwork();
	const supportedChainsID = useMemo((): number[] => (
		chains
			.filter(({id}): boolean => ![1337, 31337].includes(id))
			.map(({id}): number => id)
	), [chains]);

	return supportedChainsID;
}

export {useSupportedChainsID};
