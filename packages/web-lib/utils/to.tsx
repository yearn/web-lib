import {formatUnits, parseUnits} from 'ethers';

import type {TBigNumberish} from '../types';

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const toBN = (amount?: TBigNumberish): bigint => {
	return BigInt(amount || 0);
};

export function toUnits(value?: TBigNumberish, unitName?: TBigNumberish | undefined): string {
	return (formatUnits(toBN(value), unitName));
}

export function toRaw(value?: string, unitName?: TBigNumberish | undefined): bigint {
	return (parseUnits(value || '0', unitName));
}


