import {parseUnits} from './format.bigNumber.js';

import type {TNormalizedBN} from './format.bigNumber.js';

export function handleInputChangeEventValue(e: React.ChangeEvent<HTMLInputElement>, decimals?: number): TNormalizedBN {
	const {valueAsNumber, value} = e.target;
	const amount = valueAsNumber;
	if (isNaN(amount)) {
		return {raw: 0n, normalized: ''};
	}
	if (amount === 0) {
		let amountStr = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
		const amountParts = amountStr.split('.');
		if (amountParts[0]?.length > 1 && Number(amountParts[0]) === 0) {
			//
		} else {
			//check if we have 0 everywhere
			if (amountParts.every((part: string): boolean => Number(part) === 0)) {
				if (amountParts.length === 2) {
					amountStr = amountParts[0] + '.' + amountParts[1].slice(0, decimals);
				}
				const raw = parseUnits((amountStr || '0') as `${number}`, decimals || 18);
				return {raw: raw, normalized: amountStr || '0'};
			}
		}
	}

	const raw = parseUnits(amount.toFixed(decimals) || '0', decimals || 18);
	return {raw: raw, normalized: amount.toString() || '0'};
}

export function handleInputChangeValue(value: string, decimals?: number): TNormalizedBN {
	if (value === '') {
		return {raw: 0n, normalized: ''};
	}

	let amount = value
		.replace(/,/g, '.')
		.replace(/[^0-9.]/g, '')
		.replace(/(\..*)\./g, '$1');
	if (amount.startsWith('.')) {
		amount = '0' + amount;
	}

	const amountParts = amount.split('.');
	if (amountParts.length === 2) {
		amount = amountParts[0] + '.' + amountParts[1].slice(0, decimals);
	}

	const raw = parseUnits(amount || '0', decimals || 18);
	return {raw: raw, normalized: amount || '0'};
}
