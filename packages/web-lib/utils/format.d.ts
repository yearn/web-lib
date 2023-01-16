import type { BigNumber, BigNumberish } from 'ethers';
export declare const toSafeAmount: (v: string, m: BigNumberish, d?: number) => BigNumber;
export declare const toSafeValue: (v: string | number) => number;
export * from '@yearn-finance/web-lib/utils/format.bigNumber';
export * from '@yearn-finance/web-lib/utils/format.number';
export * from '@yearn-finance/web-lib/utils/format.time';
export * from '@yearn-finance/web-lib/utils/format.value';
