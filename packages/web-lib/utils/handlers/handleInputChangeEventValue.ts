import {parseUnits} from 'ethers';
import {toBigInt} from '@yearn-finance/web-lib/utils/format.bigNumber';

import type {TBigNumberish, TNormalizedBN} from '@yearn-finance/web-lib/types';

export function handleInputChangeEventValue(value: string, decimals?: TBigNumberish): TNormalizedBN {
	let		amount = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
	const	amountParts = amount.split('.');

	if (amountParts.length > 2) {
		throw new Error(`Invalid amount: ${amount}`);
	}

	if (amountParts.length === 2) {
		amount = amountParts[0] + '.' + amountParts[1].slice(0, Number(decimals));
	}

	const	raw = toBigInt(parseUnits(amount || '0', decimals));
	return {raw: raw, normalized: amount || '0'};
}
