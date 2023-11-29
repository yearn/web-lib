import {formatUnits, parseUnits} from 'viem';

export const toSafeAmount = (value: `${number}`, max: bigint, d = 18): bigint => {
	if (value === formatUnits(max || 0n, d)) {
		return max;
	}
	return parseUnits(value || '0', d);
};

export const toSafeValue = (v: string | number): number => {
	if (!v || v === 'NaN') {
		return 0;
	}
	return Number(v);
};
