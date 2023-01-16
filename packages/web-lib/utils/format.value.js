import { formatAmount } from '@yearn-finance/web-lib/utils/format.number';
export function counterValue(amount, price) {
    if (!amount || !price) {
        return ('$0.00');
    }
    const value = (Number(amount) || 0) * (price || 0);
    if (value > 10000) {
        return (`$${formatAmount(value, 0, 0)}`);
    }
    return (`$${formatAmount(value, 2, 2)}`);
}
export function counterValueRaw(amount, price) {
    if (!amount || !price) {
        return ('');
    }
    const value = (Number(amount) || 0) * (price || 0);
    if (value > 10000) {
        return (formatAmount(value, 0, 0));
    }
    return (formatAmount(value, 2, 2));
}
export { counterValue as formatCounterValue };
export { counterValueRaw as formatCounterValueRaw };
