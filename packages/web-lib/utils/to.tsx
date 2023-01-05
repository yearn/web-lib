import {BigNumber, ethers} from 'ethers';

import type {BigNumberish} from 'ethers';

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const toBN = (amount?: BigNumberish): BigNumber => {
	return BigNumber.from(amount || 0);
};

export function toUnits(value?: BigNumberish, unitName?: BigNumberish | undefined): string {
	return (ethers.utils.formatUnits(toBN(value), unitName));
}

export function toRaw(value?: string, unitName?: BigNumberish | undefined): BigNumber {
	return (ethers.utils.parseUnits(value || '0', unitName));
}


