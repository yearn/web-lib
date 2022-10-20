import {BigNumber, ethers} from 'ethers';
import dayjs, {extend} from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';

extend(relativeTime);
extend(dayjsDuration);

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format numbers, currency and date
**************************************************************************/
export function units(value: ethers.BigNumberish, unitName?: ethers.BigNumberish | undefined): string {
	return (ethers.utils.formatUnits(value, unitName));
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

export function	amount(amount: number, minimumFractionDigits = 2, maximumFractionDigits = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	if (maximumFractionDigits < minimumFractionDigits) {
		maximumFractionDigits = minimumFractionDigits;
	}
	return (new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits, maximumFractionDigits}).format(amount));
}

export function	currency(amount: number, decimals = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	return (new Intl.NumberFormat([locale, 'en-US'], {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals
	}).format(amount));
}

export function	date(value: number, withDate = true): string {
	if (withDate) {
		return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', timeStyle: 'short', hourCycle: 'h24'}).format(value));
	}
	return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', hourCycle: 'h24'}).format(value));
}

export function	since(value: number): string {
	return dayjs(value).from(dayjs());
}

export function	duration(value: number, withSuffix?: boolean): string {
	return dayjs.duration(value, 'milliseconds').humanize(withSuffix);
}

export const BN = (amount?: string | number | BigNumber): BigNumber => {
	return BigNumber.from(amount || 0);
};

export	const	toNormalizedValue = (v: string | BigNumber, d?: number): number => (
	Number(units(v || 0, d || 18))
);

export const	toNormalizedAmount = (v: string | BigNumber, d?: number): string => (
	amount(toNormalizedValue(v, d || 18), 6, 6)
);

export const	toSafeAmount = (v: string, m: BigNumber, d = 18): BigNumber => {
	if (v === units(m || 0, d)) {
		return m;
	}
	return ethers.utils.parseUnits(v || '0', d);
};

export const	toSafeValue = (v: string | number): number => {
	if (!v || v === 'NaN') {
		return 0;
	}
	return Number(v);
};
