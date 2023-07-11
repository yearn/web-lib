import {formatToNormalizedValue, toBigInt} from '@yearn-finance/web-lib/utils/format';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';

type TAmountOptions = {
	minimumFractionDigits?: number,
	maximumFractionDigits?: number,
	displayDigits?: number,
	shouldDisplaySymbol?: boolean
	shouldCompactValue?: boolean
}

export type TAmount = {
	value: bigint | number
	decimals: number | bigint
	symbol?: string
	options?: TAmountOptions
}

type TFormatCurrencyWithPrecision = {
	amount: number;
	maxFractionDigits: number;
	intlOptions: Intl.NumberFormatOptions;
	locale: string;
	symbol: string;
}

export const defaultOptions: TAmountOptions = {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
	displayDigits: 0,
	shouldDisplaySymbol: true,
	shouldCompactValue: true
};

export function assertValidNumber(value: number | undefined, defaultValue: number, label: string): number {
	if (value === undefined) {
		return defaultValue;
	}
	if (value < 0) {
		console.warn(`formatAmount: ${label} should be positive.`);
		return defaultValue;
	}
	if (value > 18) {
		console.warn(`formatAmount: ${label} should be less than 18.`);
		return (18);
	}
	if (Number.isNaN(value)) {
		console.warn(`formatAmount: ${label} is NaN.`);
		return (defaultValue);
	}
	if (!Number.isSafeInteger(value)) {
		console.warn(`formatAmount: ${label} should be an integer.`);
		return (defaultValue);
	}
	return value;
}

function assignOptions(options?: TAmountOptions): TAmountOptions {
	if (!options) {
		return defaultOptions;
	}

	/* 🔵 - Yearn Finance *************************************************************************
	** We need to ensure that displayDigits is a valid number. It can be any positive integer
	** between 0 and 18. If the value is invalid, we display a warning and set the value to the
	** default value (0 or 18).
	**********************************************************************************************/
	options.displayDigits = assertValidNumber(options?.displayDigits, 0, 'displayDigits');

	/* 🔵 - Yearn Finance *************************************************************************
	** We need to ensure that minimumFractionDigits is a valid number. It can be any positive
	** integer between 0 and 18. If the value is invalid, we display a warning and set the value to
	** the default value (2 or 18).
	**********************************************************************************************/
	options.minimumFractionDigits = assertValidNumber(options?.minimumFractionDigits, 2, 'minimumFractionDigits');

	/* 🔵 - Yearn Finance *************************************************************************
	** We need to ensure that maximumFractionDigits is a valid number. It can be any positive
	** integer between 0 and 18. If the value is invalid, we display a warning and set the value to
	** the default value (2 or 18).
	**********************************************************************************************/
	options.maximumFractionDigits = assertValidNumber(options?.maximumFractionDigits, 2, 'maximumFractionDigits');

	/* 🔵 - Yearn Finance *************************************************************************
	** We need to ensure that maximumFractionDigits is always bigger or equal to
	** minimumFractionDigits, otherwise we set them as equal.
	**********************************************************************************************/
	if (options.maximumFractionDigits < options.minimumFractionDigits) {
		options.maximumFractionDigits = options.minimumFractionDigits;
	}

	options.shouldDisplaySymbol ??= true;
	options.shouldCompactValue ??= true;

	return options;
}

function formatCurrencyWithPrecision({amount, maxFractionDigits, intlOptions, locale, symbol}: TFormatCurrencyWithPrecision): string {
	return new Intl.NumberFormat([locale, 'en-US'], {
		...intlOptions,
		maximumFractionDigits: Math.max(maxFractionDigits, intlOptions.maximumFractionDigits || maxFractionDigits)
	}).format(amount).replace('EUR', symbol);
}

export function formatLocalAmount(
	amount: number,
	decimals: number,
	symbol: string,
	options: TAmountOptions
): string {
	/* 🔵 - Yearn Finance *************************************************************************
	** Define the normalized elements.
	** We use a few tricks here to get the benefits of the intl package and correct formating no
	** matter the provided local.
	** - Fallback formatting is set to `fr-FR`
	** - If symbol is USD, then we will display as `123,79 $` or `$123.79` (US)
	** - If smbol is percent, then we will display as `12 %` or `12%` (US)
	** - If symbol is any other token, we will display as `123,79 USDC` or `USDC 123.79` (US)
	**********************************************************************************************/
	let locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined') {
		locale = navigator.language || 'fr-FR';
	}
	const {shouldDisplaySymbol, shouldCompactValue, ...rest} = options;
	const intlOptions: Intl.NumberFormatOptions = rest;
	let isPercent = false;
	if (symbol && shouldDisplaySymbol) {
		const uppercaseSymbol = String(symbol).toLocaleUpperCase();
		const symbolToFormat = uppercaseSymbol === 'USD' ? 'USD' : 'EUR';
		intlOptions.style = uppercaseSymbol === 'PERCENT' ? 'percent' : 'currency',
		intlOptions.currency = symbolToFormat,
		intlOptions.currencyDisplay = symbolToFormat === 'EUR' ? 'code' : 'narrowSymbol';
		isPercent = uppercaseSymbol === 'PERCENT';
	}

	if (isPercent && amount > 5 && shouldCompactValue) {
		return (
			`> ${new Intl.NumberFormat([locale, 'en-US'], intlOptions)
				.format(5)
				.replace('EUR', symbol)}`
		);
	}

	/* 🔵 - Yearn Finance *************************************************************************
	** If the amount is above 10k, we will format it to short notation:
	** - 123947 would be `123,95 k` or  `123.95K` (US)
	** - 267839372 would be `267,84 M` or  `267.84M` (US)
	**********************************************************************************************/
	if (amount > 10_000 && shouldCompactValue) {
		return (
			new Intl.NumberFormat([locale, 'en-US'], {
				...intlOptions,
				notation: 'compact',
				compactDisplay: 'short'
			}).format(amount).replace('EUR', symbol)
		);
	}

	/* 🔵 - Yearn Finance *************************************************************************
	** If the amount is very small, we adjust the decimals to try to display something, up to
	** "decimals" number of decimals
	**********************************************************************************************/
	if (amount < 0.01) {
		if (amount > 0.00000001) {
			return formatCurrencyWithPrecision({amount, maxFractionDigits: 8, intlOptions, locale, symbol});
		}
		if (amount > 0.000000000001) {
			return formatCurrencyWithPrecision({amount, maxFractionDigits: 12, intlOptions, locale, symbol});
		}
		return formatCurrencyWithPrecision({amount, maxFractionDigits: decimals, intlOptions, locale, symbol});
	}
	return (
		new Intl.NumberFormat([locale, 'en-US'], intlOptions)
			.format(amount)
			.replace('EUR', symbol)
	);
}

export function amountV2(props: TAmount): string {
	const {value} = props;
	const options = assignOptions(props.options);
	const decimals = assertValidNumber(Number(props.decimals), 18, 'decimals');
	let amount = 0;
	if (typeof(value) === 'bigint') {
		amount = formatToNormalizedValue(toBigInt(value), decimals);
	} else if (typeof(value) === 'number' && !Number.isNaN(value)) {
		amount = value;
	}

	if (isZero(amount)) {
		return formatLocalAmount(0, 0, props.symbol || '', options);
	}
	if (!Number.isFinite(amount)) {
		return '∞';
	}
	return formatLocalAmount(amount, decimals, props.symbol || '', options);
}

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
