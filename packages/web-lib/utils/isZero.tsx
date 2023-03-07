import {addressZero} from '@yearn-finance/web-lib/utils/address';

import type {TAddress, TBigNumberish} from '@yearn-finance/web-lib/types';

export function isZero(value?: bigint | TBigNumberish | TAddress): boolean {
	if (value === undefined || value === null) {
		return true;
	}
	if (typeof value === 'string' && value.startsWith('0x') && value.length === 42) {
		return value === addressZero;
	}
	if (typeof value === 'string') {
		return value === '0';
	}
	if (typeof value === 'bigint') {
		return value === BigInt(0);
	}
	return value === 0;
}

export function isGreaterThanZero(value?: bigint | TBigNumberish): boolean {
	if (value === undefined || value === null) {
		return false;
	}
	if (typeof value === 'string' && (value === '0' || value.trim().startsWith('-'))) {
		return false;
	}
	if (typeof value === 'bigint') {
		return value > BigInt(0);
	}
	return value > 0;
}
