import {getAddress, isAddress, zeroAddress} from 'viem';

import type {TAddress, TDict} from '@yearn-finance/web-lib/types';

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function used to format the addresses and work with them to
** always be sure they are correct. An address should not be a string, it
** should be a specific type address, which does not exists, so any address
** should always be called by toAddress(0x...).
**************************************************************************/
export function toAddress(address?: string | null | undefined): TAddress {
	if (!address) {
		return zeroAddress;
	}
	if (address === 'GENESIS') {
		return zeroAddress;
	}
	try {
		if (isAddress(address)) {
			return getAddress(address);
		}
	} catch (error) {
		return zeroAddress;
	}
	return zeroAddress;
}

/* 🔵 - Yearn Finance ******************************************************
** toENS is used to find the ENS name of an address. It will return the
** address if no ENS name is found.
**************************************************************************/
export function toENS(address: string | null | undefined, format?: boolean, size?: number): string {
	if (!address) {
		return address || '';
	}
	const	_address = toAddress(address);
	const	knownENS = process.env.KNOWN_ENS as unknown as TDict<string>;
	if (knownENS?.[_address]) {
		return knownENS[_address];
	}
	if (format) {
		return (truncateHex(_address, size || 4));
	}
	return address;
}

/* 🔵 - Yearn Finance ******************************************************
** isZeroAddress is used to check if an address is the zero address.
**************************************************************************/
export function isZeroAddress(address?: string): boolean {
	return toAddress(address) === zeroAddress;
}

/* 🔵 - Yearn Finance ******************************************************
** truncateHex is used to trucate a full hex string to a specific size with
** a ... in the middle. Ex: 0x1234567890abcdef1234567890abcdef12345678
** will be truncated to 0x1234...5678
**************************************************************************/
export function truncateHex(address: string | undefined, size: number): string {
	if (address !== undefined) {
		if (size === 0) {
			return address;
		}
		return `${address.slice(0, size)}...${address.slice(-size)}`;
	}
	if (size === 0) {
		return zeroAddress;
	}
	return '0x000...0000';
}

/* 🔵 - Yearn Finance ******************************************************
** allowanceKey is used to access the unique allowance key matching one
** token with one spender
**************************************************************************/
export function allowanceKey(chainID: number, token: TAddress, spender: TAddress, owner: TAddress): string {
	return `${chainID}_${token}_${spender}_${owner}`;
}

