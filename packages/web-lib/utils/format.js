import { ethers } from 'ethers';
import { formatBN, formatUnits } from '@yearn-finance/web-lib/utils/format.bigNumber';
export const toSafeAmount = (v, m, d = 18) => {
    if (v === formatUnits(m || 0, d)) {
        return formatBN(m);
    }
    return ethers.utils.parseUnits(v || '0', d);
};
export const toSafeValue = (v) => {
    if (!v || v === 'NaN') {
        return 0;
    }
    return Number(v);
};
export * from '@yearn-finance/web-lib/utils/format.bigNumber';
export * from '@yearn-finance/web-lib/utils/format.number';
export * from '@yearn-finance/web-lib/utils/format.time';
export * from '@yearn-finance/web-lib/utils/format.value';
