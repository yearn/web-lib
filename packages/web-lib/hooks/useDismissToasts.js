import { yToast } from '../components/yToast';
export function useDismissToasts() {
    const { toastMaster, useToasterStore } = yToast();
    const { toasts } = useToasterStore();
    return {
        dismissAllToasts: () => toasts.filter(({ visible }) => visible).forEach(({ id }) => toastMaster.dismiss(id)),
        dismissToast: (toastId) => toastMaster.dismiss(toastId)
    };
}
