import { BigNumber } from 'ethers';
import type { BigNumberish } from 'ethers';
export declare const toBN: (amount?: BigNumberish) => BigNumber;
export declare function toUnits(value?: BigNumberish, unitName?: BigNumberish | undefined): string;
export declare function toRaw(value?: string, unitName?: BigNumberish | undefined): BigNumber;
