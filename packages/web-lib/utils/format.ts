import {formatUnits, parseUnits} from 'viem';
import {toBigInt} from '@yearn-finance/web-lib/utils/format.bigNumber';


export const	toSafeAmount = (value: `${number}`, max: bigint, d = 18): bigint => {
	if (value === formatUnits(max || 0n, d)) {
		return toBigInt(max);
	}
	return parseUnits(value || '0', d);
};

export const	toSafeValue = (v: string | number): number => {
	if (!v || v === 'NaN') {
		return 0;
	}
	return Number(v);
};


export * from '@yearn-finance/web-lib/utils/format.bigNumber';
export * from '@yearn-finance/web-lib/utils/format.number';
export * from '@yearn-finance/web-lib/utils/format.time';
export * from '@yearn-finance/web-lib/utils/format.value';
