/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format numbers, currency and date
**************************************************************************/
type TAmount = {
	amount: number | string;
	fractionDigits?: {
		min: number;
		max: number;
	},
	displayDigits?: number;
};

export function	amount({amount, fractionDigits = {min: 2, max: 2}, displayDigits = 0}: TAmount): string {
	let locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	if (fractionDigits.max < fractionDigits.min) {
		fractionDigits.max = fractionDigits.min;
	}
	if (!amount) {
		amount = 0;
	}
	if (typeof(amount) === 'string') {
		amount = Number(amount);
	}
	if (isNaN(amount)) {
		amount = 0;
	}

	if (amount < 0.01) {
		fractionDigits.max = getSmallAmountFractionDigits(amount);
	}

	if (fractionDigits.max < fractionDigits.min) {
		fractionDigits.max = fractionDigits.min;
	}

	if (fractionDigits.max < fractionDigits.min) {
		fractionDigits.max = fractionDigits.min;
	}

	let formattedAmount = new Intl.NumberFormat(
		[locale, 'en-US'],
		{
			minimumFractionDigits: fractionDigits.min,
			maximumFractionDigits: fractionDigits.max
		}
	).format(amount);
	
	if (displayDigits > 0 && formattedAmount.length > displayDigits) {
		const leftSide = formattedAmount.slice(0, Math.ceil(displayDigits / 2));
		const rightSide = formattedAmount.slice(-Math.floor(displayDigits / 2));
		formattedAmount = `${leftSide}...${rightSide}`;
	}
	
	return formattedAmount;
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

export function withUnit(amount: number, minimumFractionDigits = 2, maximumFractionDigits = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	if (maximumFractionDigits < minimumFractionDigits) {
		maximumFractionDigits = minimumFractionDigits;
	}
	return (new Intl.NumberFormat([locale, 'en-US'], {
		minimumFractionDigits,
		maximumFractionDigits,
		notation: 'compact',
		compactDisplay: 'short',
		unitDisplay: 'short'
	}).format(amount));
}

export const formatUSD = (n: number, min = 2, max = 2): string => `$ ${amount({amount: n || 0, fractionDigits: {min, max}})}`;

export const formatPercent = (n: number, min = 2, max = 2, upperLimit = 500): string => {
	const	safeN = n || 0;
	if (safeN > upperLimit) {
		return `≧ ${amount({amount: upperLimit, fractionDigits: {min, max}})}%`;
	}
	return `${amount({amount: safeN || 0, fractionDigits: {min, max}})}%`;
};

export const formatNumberOver10K = (n: number): string => {
	if (n >= 10000) {
		return amount({amount: n, fractionDigits: {min: 0, max: 0}}) ?? '';
	}
	return amount({amount: n}) ?? '';
};

function getSmallAmountFractionDigits(amount: number): number {
	if (amount > 0.000001) {
		return 6;
	}
	if (amount > 0.00000001) {
		return 8;
	}
	if (amount > 0.000000000001) {
		return 12;
	}
	if (amount > 0.0000000000000001) {
		return 16;
	}
	return 20;
}

export {amount as formatAmount};
export {currency as formatCurrency};
export {withUnit as formatWithUnit};
