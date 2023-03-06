import {formatUnits as formatUnitsFromEthers, parseUnits as parseUnitsFromEthers} from 'ethers';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

import type {TBigNumberish} from '../types';

export type	TNormalizedBN = {
	raw: bigint,
	normalized: number | string,
}

export const Zero = BigInt(0);
export const MaxUint256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
export const MinInt256: bigint = BigInt('0x8000000000000000000000000000000000000000000000000000000000000000') * BigInt(-1);
export const MaxInt256 = BigInt('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
export const DefaultTNormalizedBN: TNormalizedBN = {raw: Zero, normalized: 0};

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const BN = (amount?: TBigNumberish): bigint => {
	return BigInt(amount || 0);
};

export function formatUnits(value?: TBigNumberish, unitName?: TBigNumberish | undefined): string {
	return (formatUnitsFromEthers(BN(value), unitName));
}
export function parseUnits(value: string, unitName?: TBigNumberish | undefined): bigint {
	return (parseUnitsFromEthers(value, unitName));
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
	if (bnAmount === Zero) {
		return (`0${symbolWithPrefix}`);
	}
	if (bnAmount === MaxUint256) {
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

export	const	toNormalizedValue = (v: TBigNumberish, d?: number): number => (
	Number(formatUnits(v || 0, d ?? 18))
);

export const	toNormalizedAmount = (v: TBigNumberish, d?: number): string => (
	formatAmount(toNormalizedValue(v, d ?? 18), 6, 6)
);

export const	toNormalizedBN = (value: TBigNumberish, decimals?: number): TNormalizedBN => ({
	raw: BN(value),
	normalized: toNormalizedValue(BN(value), decimals ?? 18)
});

export {toNormalizedAmount as formatToNormalizedAmount};
export {toNormalizedValue as formatToNormalizedValue};
export {toNormalizedBN as formatToNormalizedBN};
export {bigNumberAsAmount as formatBigNumberAsAmount};
export {BN as formatBN};
