import { BigNumber } from 'ethers';
import type { BigNumberish } from 'ethers';
export type TNormalizedBN = {
    raw: BigNumber;
    normalized: number | string;
};
export declare const DefaultTNormalizedBN: TNormalizedBN;
export declare const BN: (amount?: BigNumberish) => BigNumber;
export declare function units(value?: BigNumberish, unitName?: BigNumberish | undefined): string;
export declare function bigNumberAsAmount(bnAmount?: BigNumber, decimals?: number, decimalsToDisplay?: number, symbol?: string): string;
export declare const toNormalizedValue: (v: BigNumberish, d?: number) => number;
export declare const toNormalizedAmount: (v: BigNumberish, d?: number) => string;
export declare const toNormalizedBN: (value: BigNumberish, decimals?: number) => TNormalizedBN;
export { units as formatUnits };
export { toNormalizedAmount as formatToNormalizedAmount };
export { toNormalizedValue as formatToNormalizedValue };
export { toNormalizedBN as formatToNormalizedBN };
export { bigNumberAsAmount as formatBigNumberAsAmount };
export { BN as formatBN };
