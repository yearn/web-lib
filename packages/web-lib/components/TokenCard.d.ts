import React from 'react';
import type { ReactElement } from 'react';
export type TTokenCard = {
    label: string;
    value: string;
    imgSrc: string;
    onClick?: React.MouseEventHandler;
} & React.ComponentPropsWithoutRef<'div'>;
declare function TokenCardBase(props: TTokenCard): ReactElement;
declare function Wrapper({ children }: {
    children: ReactElement[];
}): ReactElement;
export declare const TokenCard: typeof TokenCardBase & {
    Wrapper: typeof Wrapper;
};
export {};
