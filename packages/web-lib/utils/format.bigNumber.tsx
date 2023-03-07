import {formatUnits as ethersFormatUnits, parseUnits as ethersParseUnits} from 'ethers';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

import type {TBigNumberish, TNormalizedBN} from '@yearn-finance/web-lib/types';

export const Zero = toBigInt(0);
export const WeiPerEther = toBigInt('1000000000000000000');
export const MaxUint256 = toBigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
export const MinInt256 = toBigInt(BigInt('0x8000000000000000000000000000000000000000000000000000000000000000') * BigInt(-1));
export const MaxInt256 = toBigInt('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
export const DefaultTNormalizedBN: TNormalizedBN = {raw: Zero, normalized: 0};

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format bigNumbers, currency and date
**************************************************************************/
export function toBigInt(value?: TBigNumberish): bigint {
	return BigInt(value || 0);
}
export function toNumber(value?: TBigNumberish, fallback = 0): number {
	return Number(value || fallback);
}

export function formatUnits(value?: bigint, unitName?: TBigNumberish | undefined): string {
	return ethersFormatUnits((value || 0n).valueOf(), unitName);
}
export function parseUnits(value: string, unitName?: TBigNumberish | undefined): bigint {
	return toBigInt(ethersParseUnits(value.valueOf(), unitName));
}

export function	bigNumberAsAmount(
	bnAmount: TBigNumberish = 0n,
	decimals = 18,
	decimalsToDisplay = 2,
	symbol = ''
): string {
	let		locale = 'fr-FR';
	if (typeof navigator !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}

	let	symbolWithPrefix = symbol;
	if (symbol.length > 0 && symbol !== '%') {
		symbolWithPrefix = ` ${symbol}`;
	}

	const	amount = toBigInt(bnAmount);
	if (amount === Zero) {
		return `0${symbolWithPrefix}`;
	}
	if (amount === MaxUint256) {
		return `∞${symbolWithPrefix}`;
	}

	const	formatedAmount = ethersFormatUnits(bnAmount, decimals);
	return `${
		new Intl.NumberFormat([locale, 'en-US'], {
			minimumFractionDigits: 0,
			maximumFractionDigits: decimalsToDisplay
		}).format(Number(formatedAmount))
	}${symbolWithPrefix}`;
}

export	const	toNormalizedValue = (v: bigint, d?: number): number => Number(ethersFormatUnits(v.valueOf(), d ?? 18));
export const	toNormalizedAmount = (v: bigint, d?: number): string => formatAmount(toNormalizedValue(v, d ?? 18), 6, 6);

export const	toNormalizedBN = (value: TBigNumberish, decimals?: number): TNormalizedBN => {
	const	bigValue = toBigInt(value as TBigNumberish);
	return {
		raw: bigValue,
		normalized: toNormalizedValue(bigValue, decimals ?? 18)
	};
};

export {toNormalizedAmount as formatToNormalizedAmount};
export {toNormalizedValue as formatToNormalizedValue};
export {toNormalizedBN as formatToNormalizedBN};
export {bigNumberAsAmount as formatBigNumberAsAmount};
