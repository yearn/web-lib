import	{ethers}		from	'ethers';
import	dayjs			from	'dayjs';
import	relativeTime	from	'dayjs/plugin/relativeTime.js';
import	dayjsDuration	from	'dayjs/plugin/duration.js';
// const	relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime);
dayjs.extend(dayjsDuration);
// dayjs.extend(require('dayjs/plugin/duration').default);

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format numbers, currency and date
**************************************************************************/
export function units(value: ethers.BigNumberish, unitName?: ethers.BigNumberish | undefined): string {
	return (ethers.utils.formatUnits(value, unitName));
}

export function	bigNumberAsAmount(
	bnAmount = ethers.BigNumber.from(0),
	decimals = 18,
	decimalsToDisplay = 2,
	symbol = ''
): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined')
		locale = navigator.language || 'fr-FR';
	
	let	symbolWithPrefix = symbol;
	if (symbol.length > 0 && symbol !== '%') {
		symbolWithPrefix = ` ${symbol}`;
	}

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

export function	amount(amount: number, decimals = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined')
		locale = navigator.language || 'fr-FR';
	return (new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits: 0, maximumFractionDigits: decimals}).format(amount));
}

export function	currency(amount: number, decimals = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined')
		locale = navigator.language || 'fr-FR';
	return (new Intl.NumberFormat([locale, 'en-US'], {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals
	}).format(amount));
}

export function	date(value: number, withDate = true): string {
	if (withDate)
		return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', timeStyle: 'short', hourCycle: 'h24'}).format(value));
	return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', hourCycle: 'h24'}).format(value));
}

export function	since(value: number): string {
	return dayjs(value).from(dayjs());
}

export function	duration(value: number, withSuffix?: boolean): string {
	return dayjs.duration(value, 'milliseconds').humanize(withSuffix);
}
