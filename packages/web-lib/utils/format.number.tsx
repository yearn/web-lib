/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format numbers, currency and date
**************************************************************************/
export function	amount(amount: number, minimumFractionDigits = 2, maximumFractionDigits = 2): string {
	let		locale = 'fr-FR';
	if (typeof navigator !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	if (maximumFractionDigits < minimumFractionDigits) {
		maximumFractionDigits = minimumFractionDigits;
	}
	return new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits, maximumFractionDigits}).format(amount);
}

export function	currency(amount: number, decimals = 2): string {
	let		locale = 'fr-FR';
	if (typeof navigator !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	return new Intl.NumberFormat([locale, 'en-US'], {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals
	}).format(amount);
}

export function withUnit(amount: number, minimumFractionDigits = 2, maximumFractionDigits = 2): string {
	let		locale = 'fr-FR';
	if (typeof navigator !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	if (maximumFractionDigits < minimumFractionDigits) {
		maximumFractionDigits = minimumFractionDigits;
	}
	return new Intl.NumberFormat([locale, 'en-US'], {
		minimumFractionDigits,
		maximumFractionDigits,
		notation: 'compact',
		compactDisplay: 'short',
		unitDisplay: 'short'
	}).format(amount);
}

export const formatUSD = (n: number, min = 2, max = 2): string => `$ ${amount(n || 0, min, max)}`;

export const formatPercent = (n: number, min = 2, max = 2, upperLimit = 500): string => {
	const	safeN = n || 0;
	if (safeN > upperLimit) {
		return `≧ ${amount(upperLimit, min, max)}%`;
	}
	return `${amount(safeN || 0, min, max)}%`;
};

export {amount as formatAmount};
export {currency as formatCurrency};
export {withUnit as formatWithUnit};
