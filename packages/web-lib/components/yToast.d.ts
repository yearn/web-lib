import { toast as toastMaster, useToasterStore } from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';
type TCTA = {
    label: string;
    onClick: () => void;
};
type TYToast = {
    content: string;
    type: 'error' | 'warning' | 'success' | 'info';
    cta?: TCTA;
} & ToastOptions;
export declare function yToast(): {
    toast: (props: TYToast) => string;
    useToasterStore: typeof useToasterStore;
    toastMaster: typeof toastMaster;
};
export {};
