import React from 'react';
import type { ReactElement } from 'react';
export type TCard = {
    className?: string;
    variant?: 'surface' | 'background';
    padding?: 'none' | 'narrow' | 'regular';
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'section'>;
export type TCardDetailSummary = {
    startChildren?: React.ReactNode;
    endChildren?: React.ReactNode;
    open?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;
export type TCardWithTabsOption = {
    label: string;
    children: ReactElement;
};
export type TCardWithTabs = {
    tabs: TCardWithTabsOption[];
};
export type TCardDetail = {
    summary?: TCardDetailSummary | ReactElement | ((p: unknown) => ReactElement | TCardDetailSummary) | any;
    variant?: 'surface' | 'background';
    isSticky?: boolean;
    children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;
declare function CardDetailsSummary({ startChildren, endChildren, open, ...props }: TCardDetailSummary): ReactElement;
declare function CardDetails(props: TCardDetail): ReactElement;
declare function CardWithTabs(props: TCardWithTabs): ReactElement;
declare function CardBase(props: TCard): ReactElement;
export { CardWithTabs };
export declare const Card: typeof CardBase & {
    Detail: typeof CardDetails & {
        Summary: typeof CardDetailsSummary;
    };
    Tabs: typeof CardWithTabs;
};
