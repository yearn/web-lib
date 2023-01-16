import React from 'react';
import type { ReactNode } from 'react';
export type TButtonVariant = 'filled' | 'outlined' | 'light' | 'inherit' | string;
export type TButton = {
    children: ReactNode;
    as?: 'a' | 'button';
    variant?: TButtonVariant;
    shouldStopPropagation?: boolean;
    isBusy?: boolean;
    isDisabled?: boolean;
} & React.ComponentPropsWithoutRef<'button' | 'a'>;
export type TMouseEvent = React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>;
declare const Button: React.ForwardRefExoticComponent<TButton & React.RefAttributes<unknown>>;
export { Button };
