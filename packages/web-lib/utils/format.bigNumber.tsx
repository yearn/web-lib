import {BigNumber, ethers} from 'ethers';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

import type {BigNumberish} from 'ethers';

export type	TNormalizedBN = {
	raw: BigNumber,
	normalized: number | string,
}

export const {Zero} = ethers.constants;
export const DefaultTNormalizedBN: TNormalizedBN = {raw: Zero, normalized: 0};

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const BN = (amount?: BigNumberish): BigNumber => {
	return BigNumber.from(amount || 0);
};

export function formatUnits(value?: BigNumberish, unitName?: BigNumberish | undefined): string {
	return (ethers.utils.formatUnits(BN(value), unitName));
}
export function parseUnits(value: string, unitName?: BigNumberish | undefined): BigNumber {
	return (ethers.utils.parseUnits(value, unitName));
}

export function	bigNumberAsAmount(
	bnAmount = Zero,
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
	}
	if (bnAmount.eq(ethers.constants.MaxUint256)) {
		return (`∞${symbolWithPrefix}`);
	}

	const	formatedAmount = formatUnits(bnAmount, decimals);
	return (`${
		new Intl.NumberFormat([locale, 'en-US'], {
			minimumFractionDigits: 0,
			maximumFractionDigits: decimalsToDisplay
		}).format(Number(formatedAmount))
	}${symbolWithPrefix}`);
}

export	const	toNormalizedValue = (v: BigNumberish, d?: number): number => (
	Number(formatUnits(v || 0, d ?? 18))
);

export const	toNormalizedAmount = (v: BigNumberish, d?: number): string => (
	formatAmount(toNormalizedValue(v, d ?? 18), 6, 6)
);

export const	toNormalizedBN = (value: BigNumberish, decimals?: number): TNormalizedBN => ({
	raw: BN(value),
	normalized: toNormalizedValue(BN(value), decimals ?? 18)
});

export {toNormalizedAmount as formatToNormalizedAmount};
export {toNormalizedValue as formatToNormalizedValue};
export {toNormalizedBN as formatToNormalizedBN};
export {bigNumberAsAmount as formatBigNumberAsAmount};
export {BN as formatBN};
