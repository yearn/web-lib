type TUseDismissToasts = {
    dismissAllToasts: () => void;
    dismissToast: (toastId?: string) => void;
};
export declare function useDismissToasts(): TUseDismissToasts;
export {};
