/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format numbers, currency and date
**************************************************************************/
export function	amount(amount: number | string, minimumFractionDigits = 2, maximumFractionDigits = 2, displayDigits = 0): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	if (maximumFractionDigits < minimumFractionDigits) {
		maximumFractionDigits = minimumFractionDigits;
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
	let formattedAmount = new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits, maximumFractionDigits}).format(amount);
	
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

export const formatUSD = (n: number, min = 2, max = 2): string => `$ ${amount(n || 0, min, max)}`;

export const formatPercent = (n: number, min = 2, max = 2, upperLimit = 500): string => {
	const	safeN = n || 0;
	if (safeN > upperLimit) {
		return `≧ ${amount(upperLimit, min, max)}%`;
	}
	return `${amount(safeN || 0, min, max)}%`;
};

export const formatNumberOver10K = (n: number): string => {
	if (n >= 10000) {
		return amount(n, 0, 0) ?? '';
	}
	return amount(n) ?? '';
};

export {amount as formatAmount};
export {currency as formatCurrency};
export {withUnit as formatWithUnit};
