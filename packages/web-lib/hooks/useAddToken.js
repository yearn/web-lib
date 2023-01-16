import { yToast } from '@yearn-finance/web-lib/components/yToast';
import { useDismissToasts } from './useDismissToasts';
export function useAddToken() {
    const { toast } = yToast();
    const { dismissAllToasts } = useDismissToasts();
    return (options) => {
        window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options
            }
        })
            .then((success) => {
            dismissAllToasts();
            if (success) {
                toast({ type: 'success', content: `${options.symbol} successfully added to wallet` });
            }
            else {
                toast({ type: 'error', content: `${options.symbol} failed to be added to wallet` });
            }
        })
            .catch(console.error);
    };
}
