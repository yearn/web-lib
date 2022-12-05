import {BigNumber, ethers} from 'ethers';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

import type {BigNumberish} from 'ethers';

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const BN = (amount?: BigNumberish): BigNumber => {
	return BigNumber.from(amount || 0);
};

export function units(value: BigNumberish, unitName?: BigNumberish | undefined): string {
	return (ethers.utils.formatUnits(BN(value), unitName));
}

export function	bigNumberAsAmount(
	bnAmount = ethers.constants.Zero,
	decimals = 18,
	decimalsToDisplay = 2,
	symbol = ''
): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	
	let	symbolWithPrefix = symbol;
	if (symbol.length > 0 && symbol !== '%') {
		symbolWithPrefix = ` ${symbol}`;
	}

	bnAmount = BN(bnAmount);
	if (bnAmount.isZero()) {
		return (`0${symbolWithPrefix}`);
	} else if (bnAmount.eq(ethers.constants.MaxUint256)) {
		return (`∞${symbolWithPrefix}`);
	}

	const	formatedAmount = units(bnAmount, decimals);
	return (`${
		new Intl.NumberFormat([locale, 'en-US'], {
			minimumFractionDigits: 0,
			maximumFractionDigits: decimalsToDisplay
		}).format(Number(formatedAmount))
	}${symbolWithPrefix}`);
}

export	const	toNormalizedValue = (v: BigNumberish, d?: number): number => (
	Number(units(v || 0, d || 18))
);

export const	toNormalizedAmount = (v: BigNumberish, d?: number): string => (
	formatAmount(toNormalizedValue(v, d || 18), 6, 6)
);

export {units as formatUnits};
export {toNormalizedAmount as formatToNormalizedAmount};
export {toNormalizedValue as formatToNormalizedValue};
export {bigNumberAsAmount as formatBigNumberAsAmount};
export {BN as formatBN};