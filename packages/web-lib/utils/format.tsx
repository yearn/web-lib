import {formatUnits, parseUnits} from '@yearn-finance/web-lib/utils/format.bigNumber';

export const	toSafeAmount = (v: string, m: bigint, d = 18): bigint => {
	if (v === formatUnits(m, d)) {
		return m;
	}
	return parseUnits(v, d);
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
