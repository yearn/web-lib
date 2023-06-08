import {parseUnits} from '@yearn-finance/web-lib/utils/format';

import type {TNormalizedBN} from '@yearn-finance/web-lib/utils/format';

export function handleInputChangeEventValue(value: string, decimals?: number): TNormalizedBN {
	if (value === '') {
		return {raw: 0n, normalized: ''};
	}

	let		amount = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
	const	amountParts = amount.split('.');

	if (amountParts.length > 2) {
		throw new Error(`Invalid amount: ${amount}`);
	}

	if (amountParts.length === 2) {
		amount = amountParts[0] + '.' + amountParts[1].slice(0, decimals);
	}

	const	raw = parseUnits(amount || '0', decimals);
	return ({raw: raw, normalized: amount || '0'});
}
