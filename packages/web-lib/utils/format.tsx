import {parseUnits} from 'ethers';
import {formatBN, formatUnits} from '@yearn-finance/web-lib/utils/format.bigNumber';

import type {TBigNumberish} from '@yearn-finance/web-lib/types';

export const	toSafeAmount = (v: string, m: TBigNumberish, d = 18): bigint => {
	if (v === formatUnits(m || 0, d)) {
		return formatBN(m);
	}
	return parseUnits(v || '0', d);
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
