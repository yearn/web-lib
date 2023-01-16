export function amount(amount, minimumFractionDigits = 2, maximumFractionDigits = 2) {
    let locale = 'fr-FR';
    if (typeof (navigator) !== 'undefined') {
        locale = navigator.language || 'fr-FR';
    }
    if (maximumFractionDigits < minimumFractionDigits) {
        maximumFractionDigits = minimumFractionDigits;
    }
    return (new Intl.NumberFormat([locale, 'en-US'], { minimumFractionDigits, maximumFractionDigits }).format(amount));
}
export function currency(amount, decimals = 2) {
    let locale = 'fr-FR';
    if (typeof (navigator) !== 'undefined') {
        locale = navigator.language || 'fr-FR';
    }
    return (new Intl.NumberFormat([locale, 'en-US'], {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals
    }).format(amount));
}
export function withUnit(amount, minimumFractionDigits = 2, maximumFractionDigits = 2) {
    let locale = 'fr-FR';
    if (typeof (navigator) !== 'undefined') {
        locale = navigator.language || 'fr-FR';
    }
    if (maximumFractionDigits < minimumFractionDigits) {
        maximumFractionDigits = minimumFractionDigits;
    }
    return (new Intl.NumberFormat([locale, 'en-US'], {
        minimumFractionDigits,
        maximumFractionDigits,
        notation: 'compact',
        compactDisplay: 'short',
        unitDisplay: 'short'
    }).format(amount));
}
export { amount as formatAmount };
export { currency as formatCurrency };
export { withUnit as formatWithUnit };
