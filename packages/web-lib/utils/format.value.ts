import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

export function	counterValue(amount: number | string, price: number): string {
	if (!amount || !price) {
		return (`$${formatAmount({amount: 0, fractionDigits: {min: 2, max: 2}})}`);
	}

	const value = (Number(amount) || 0) * (price || 0);
	if (value > 10000) {
		return (`$${formatAmount({amount: value, fractionDigits: {min: 0, max: 0}})}`);
	}
	return (`$${formatAmount({amount: value, fractionDigits: {min: 2, max: 2}})}`);
}

export function	counterValueRaw(amount: number | string, price: number): string {
	if (!amount || !price) {
		return ('');
	}
	const value = (Number(amount) || 0) * (price || 0);
	if (value > 10000) {
		return (formatAmount({amount: value, fractionDigits: {min: 0, max: 0}}));
	}
	return (formatAmount({amount: value, fractionDigits: {min: 2, max: 2}}));
}

export {counterValue as formatCounterValue};
export {counterValueRaw as formatCounterValueRaw};
