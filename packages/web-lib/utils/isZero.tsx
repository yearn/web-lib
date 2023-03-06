import type {TBigNumberish} from '@yearn-finance/web-lib/types';

export function isZero(value: TBigNumberish | undefined | null): boolean {
	if (value === undefined || value === null) {
		return true;
	}
	if (typeof value === 'string') {
		return value === '0';
	}
	if (typeof value === 'bigint') {
		return value === BigInt(0);
	}
	return value === 0;
}
