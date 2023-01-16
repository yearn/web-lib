import { BigNumber, ethers } from 'ethers';
export const toBN = (amount) => {
    return BigNumber.from(amount || 0);
};
export function toUnits(value, unitName) {
    return (ethers.utils.formatUnits(toBN(value), unitName));
}
export function toRaw(value, unitName) {
    return (ethers.utils.parseUnits(value || '0', unitName));
}
