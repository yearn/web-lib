import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';

export function	formatCounterValue(amount: number | string, price: number): string {
	if (!amount || !price) {
		return ('$0.00');
	}
	const value = Number(amount || 0) * (price || 0);
	if (value > 10000) {
		return (`$${formatAmount(value, 0, 0)}`);
	}
	return (`$${formatAmount(value, 2, 2)}`);
}

export function	formatCounterValueRaw(amount: number | string, price: number): string {
	if (!amount || !price) {
		return ('');
	}
	const value = Number(amount || 0) * (price || 0);
	if (value > 10000) {
		return (formatAmount(value, 0, 0));
	}
	return (formatAmount(value, 2, 2));
}
