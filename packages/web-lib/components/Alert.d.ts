import type { ReactElement } from 'react';
export type TAlertLevels = 'none' | 'info' | 'warning' | 'error' | 'critical';
export type TAlertBanner = {
    title: string;
    level?: TAlertLevels;
    children: ReactElement | ReactElement[];
    canClose?: boolean;
    isVisible?: boolean;
    onClose?: () => void;
    maxHeight?: string;
};
export type TAlertBox = {
    alerts: string[];
    level: TAlertLevels;
};
export declare function Alert(): void;
export declare namespace Alert {
    var Banner: typeof AlertBanner;
    var Box: typeof AlertBox;
}
declare function AlertBanner(props: TAlertBanner): ReactElement;
declare function AlertBox(props: TAlertBox): ReactElement | null;
export default Alert;
