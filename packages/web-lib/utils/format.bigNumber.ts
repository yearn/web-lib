import {formatUnits, parseUnits as vParseUnits} from 'viem';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

export type TNumberish = number | string | `${number}` //wagmi weird type
export type	TNormalizedBN = {
	raw: bigint,
	normalized: number | string,
}

export const BigZero = 0n;
export const MaxUint256 = 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;
export const DefaultTNormalizedBN: TNormalizedBN = {raw: BigZero, normalized: 0};

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export const toBigInt = (amount?: TNumberish): bigint => {
	return BigInt(amount || 0);
};

export function	bigNumberAsAmount(
	bnAmount = BigZero,
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

	if (bnAmount === BigZero) {
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

export	const	toNormalizedValue = (v: bigint, d?: number): number => {
	return Number(formatUnits(v, d ?? 18));
};

export const	toNormalizedAmount = (v: bigint, d?: number): string => {
	return formatAmount(toNormalizedValue(v, d ?? 18), 6, 6);
};

export const	toNormalizedBN = (value: TNumberish, decimals?: number): TNormalizedBN => ({
	raw: toBigInt(value),
	normalized: toNormalizedValue(toBigInt(value), decimals ?? 18)
});

export function	parseUnits(value: TNumberish, decimals = 18): bigint {
	const valueAsNumber = value as `${number}`;
	return vParseUnits(valueAsNumber, decimals);
}

export {toNormalizedAmount as formatToNormalizedAmount};
export {toNormalizedValue as formatToNormalizedValue};
export {toNormalizedBN as formatToNormalizedBN};
export {bigNumberAsAmount as formatBigNumberAsAmount};
