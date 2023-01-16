import { BigNumber, ethers } from 'ethers';
import { formatAmount } from '@yearn-finance/web-lib/utils/format.number';
export const DefaultTNormalizedBN = { raw: ethers.constants.Zero, normalized: 0 };
export const BN = (amount) => {
    return BigNumber.from(amount || 0);
};
export function units(value, unitName) {
    return (ethers.utils.formatUnits(BN(value), unitName));
}
export function bigNumberAsAmount(bnAmount = ethers.constants.Zero, decimals = 18, decimalsToDisplay = 2, symbol = '') {
    let locale = 'fr-FR';
    if (typeof (navigator) !== 'undefined') {
        locale = navigator.language || 'fr-FR';
    }
    let symbolWithPrefix = symbol;
    if (symbol.length > 0 && symbol !== '%') {
        symbolWithPrefix = ` ${symbol}`;
    }
    bnAmount = BN(bnAmount);
    if (bnAmount.isZero()) {
        return (`0${symbolWithPrefix}`);
    }
    if (bnAmount.eq(ethers.constants.MaxUint256)) {
        return (`∞${symbolWithPrefix}`);
    }
    const formatedAmount = units(bnAmount, decimals);
    return (`${new Intl.NumberFormat([locale, 'en-US'], {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalsToDisplay
    }).format(Number(formatedAmount))}${symbolWithPrefix}`);
}
export const toNormalizedValue = (v, d) => (Number(units(v || 0, d ?? 18)));
export const toNormalizedAmount = (v, d) => (formatAmount(toNormalizedValue(v, d ?? 18), 6, 6));
export const toNormalizedBN = (value, decimals) => ({
    raw: BN(value),
    normalized: toNormalizedValue(BN(value), decimals ?? 18)
});
export { units as formatUnits };
export { toNormalizedAmount as formatToNormalizedAmount };
export { toNormalizedValue as formatToNormalizedValue };
export { toNormalizedBN as formatToNormalizedBN };
export { bigNumberAsAmount as formatBigNumberAsAmount };
export { BN as formatBN };
