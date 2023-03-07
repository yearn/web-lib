import {formatUnits, parseUnits} from 'ethers';
import {toBigInt} from '@yearn-finance/web-lib/utils/format.bigNumber';

import type {TBigNumberish} from '@yearn-finance/web-lib/types';

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const toBN = (amount?: TBigNumberish): bigint => {
	return toBigInt(amount);
};

export function toUnits(value: TBigNumberish, unitName?: TBigNumberish | undefined): string {
	return (formatUnits((value || 0n).valueOf(), unitName));
}

export function toRaw(value?: string, unitName?: TBigNumberish | undefined): bigint {
	return (parseUnits(value || '0', unitName));
}


