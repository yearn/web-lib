import {ethers} from 'ethers';
import {formatBN, formatUnits} from '@yearn-finance/web-lib/utils/format.bigNumber';

import type {BigNumber, BigNumberish} from 'ethers';

export const	toSafeAmount = (v: string, m: BigNumberish, d = 18): BigNumber => {
	if (v === formatUnits(m || 0, d)) {
		return formatBN(m);
	}
	return ethers.utils.parseUnits(v || '0', d);
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