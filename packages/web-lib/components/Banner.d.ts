import React from 'react';
import type { ReactElement, ReactNode } from 'react';
export type TBanner = {
    title: string;
    primaryButton?: ReactElement;
    secondaryButton?: ReactElement;
    children: ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;
export type TDefaultVariant = {
    title?: string;
    primaryButton?: ReactElement;
    secondaryButton?: ReactElement;
    children?: ReactNode;
};
export type TBannerPagination = {
    children: ReactElement[];
    canClose?: boolean;
    onClose?: () => void;
};
declare function BannerBase(props: TBanner): ReactElement;
declare function BannerControlable(props: TBannerPagination): ReactElement;
export declare const Banner: typeof BannerBase & {
    WithControls: typeof BannerControlable;
};
export {};
