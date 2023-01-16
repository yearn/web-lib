export declare function amount(amount: number, minimumFractionDigits?: number, maximumFractionDigits?: number): string;
export declare function currency(amount: number, decimals?: number): string;
export declare function withUnit(amount: number, minimumFractionDigits?: number, maximumFractionDigits?: number): string;
export { amount as formatAmount };
export { currency as formatCurrency };
export { withUnit as formatWithUnit };
