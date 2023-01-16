import React from 'react';
import type { BigNumber } from 'ethers';
import type { ReactElement } from 'react';
export type TInput = {
    value: string | number;
    onChange: (s: string | number) => void;
    onSearch?: (s: string | number) => void;
    ariaLabel?: string;
    withMax?: boolean;
    onMaxClick?: () => void;
} & React.ComponentPropsWithoutRef<'input'>;
export type TInputBigNumber = {
    value: string;
    onSetValue: (s: string) => void;
    onValueChange?: (s: string) => void;
    maxValue?: BigNumber;
    withMax?: boolean;
    decimals?: number;
    balance?: string;
    price?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;
declare function InputBase(props: TInput): ReactElement;
declare namespace InputBase {
    var BigNumber: typeof InputBigNumber;
}
declare function InputBigNumber(props: TInputBigNumber): ReactElement;
export declare const Input: typeof InputBase;
export {};
