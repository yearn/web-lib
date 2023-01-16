import { yToast } from '@yearn-finance/web-lib/components/yToast';
const timeout = 3000;
const defaultTxStatus = { none: true, pending: false, success: false, error: false };
const errorTxStatus = { none: false, pending: false, success: false, error: true };
const pendingTxStatus = { none: false, pending: true, success: false, error: false };
const successTxStatus = { none: false, pending: false, success: true, error: false };
class Transaction {
    provider;
    onStatus;
    options;
    txArgs;
    funcCall;
    successCall;
    constructor(provider, funcCall, onStatus, options) {
        this.provider = provider;
        this.funcCall = funcCall;
        this.onStatus = onStatus;
        this.options = options;
    }
    populate(...txArgs) {
        this.txArgs = txArgs;
        return this;
    }
    onSuccess(onSuccess) {
        this.successCall = onSuccess;
        return this;
    }
    async perform() {
        const { toast } = yToast();
        this.onStatus(pendingTxStatus);
        try {
            const isSuccess = await this.funcCall(this.provider, ...this.txArgs);
            if (isSuccess) {
                if (this.successCall) {
                    await this.successCall();
                }
                toast({ content: 'Transaction successful', type: 'success' });
                if (this?.options?.shouldIgnoreSuccessTxStatusChange) {
                    return true;
                }
                this.onStatus(successTxStatus);
                setTimeout(() => this.onStatus(defaultTxStatus), timeout);
                return true;
            }
            toast({ content: 'Transaction failed', type: 'error' });
            this.onStatus(errorTxStatus);
            setTimeout(() => this.onStatus(defaultTxStatus), timeout);
            return false;
        }
        catch (error) {
            toast({ content: 'Transaction failed', type: 'error' });
            this.onStatus(errorTxStatus);
            setTimeout(() => this.onStatus(defaultTxStatus), timeout);
            return false;
        }
    }
}
export { defaultTxStatus, Transaction };
