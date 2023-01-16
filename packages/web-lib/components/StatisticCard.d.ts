import React from 'react';
import type { ReactElement, ReactNode } from 'react';
export type TStatisticCard = {
    label: string;
    value: ReactNode;
    variant?: 'surface' | 'background';
} & React.ComponentPropsWithoutRef<'div'>;
declare function StatisticCardBase(props: TStatisticCard): ReactElement;
type TWrapper = {
    children: ReactElement[];
};
declare function Wrapper({ children }: TWrapper): ReactElement;
export declare const StatisticCard: typeof StatisticCardBase & {
    Wrapper: typeof Wrapper;
};
export {};
