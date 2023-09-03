import {formatAmount} from './format.number.js';

export function	counterValue(amount: number | string, price: number): string {
	if (!amount || !price) {
		return (`$${formatAmount(0, 2, 2)}`);
	}

	const value = (Number(amount) || 0) * (price || 0);
	if (value > 10000) {
		return (`$${formatAmount(value, 0, 0)}`);
	}
	return (`$${formatAmount(value, 2, 2)}`);
}

export function	counterValueRaw(amount: number | string, price: number): string {
	if (!amount || !price) {
		return ('');
	}
	const value = (Number(amount) || 0) * (price || 0);
	if (value > 10000) {
		return (formatAmount(value, 0, 0));
	}
	return (formatAmount(value, 2, 2));
}

export {counterValue as formatCounterValue};
export {counterValueRaw as formatCounterValueRaw};
