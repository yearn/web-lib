import {toAddress} from '@builtbymom/web3/utils';

import {useYearnWallet} from '../contexts/useYearnWallet';

import type {TAddress, TDict, TNormalizedBN} from '@builtbymom/web3/types';

/******************************************************************************
 ** The useYearnBalance hook is used to retrieve the balance of a token from
 ** the useYearnWallet context.
 *****************************************************************************/
export function useYearnBalance({
	address,
	chainID
}: {
	address: string | TAddress;
	chainID: number;
	source?: TDict<TNormalizedBN>;
}): TNormalizedBN {
	const {getBalance} = useYearnWallet();

	return getBalance({address: toAddress(address), chainID: chainID});
}
