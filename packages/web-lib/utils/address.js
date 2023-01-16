import { ethers } from 'ethers';
export function toAddress(address) {
    if (!address) {
        return ethers.constants.AddressZero;
    }
    if (address === 'GENESIS') {
        return ethers.constants.AddressZero;
    }
    try {
        return ethers.utils.getAddress(address);
    }
    catch (error) {
        return ethers.constants.AddressZero;
    }
}
export function toENS(address, format, size) {
    if (!address) {
        return address || '';
    }
    const _address = toAddress(address);
    const knownENS = process.env.KNOWN_ENS;
    if (knownENS?.[_address]) {
        return knownENS[_address];
    }
    if (format) {
        return (truncateHex(_address, size || 4));
    }
    return address;
}
export function isZeroAddress(address) {
    return toAddress(address) === ethers.constants.AddressZero;
}
export function truncateHex(address, size) {
    if (address !== undefined) {
        if (size === 0) {
            return address;
        }
        return `${address.slice(0, size)}...${address.slice(-size)}`;
    }
    if (size === 0) {
        return ethers.constants.AddressZero;
    }
    return '0x000...0000';
}
export function allowanceKey(token, spender) {
    return `${toAddress(token)}_${toAddress(spender)}`;
}
