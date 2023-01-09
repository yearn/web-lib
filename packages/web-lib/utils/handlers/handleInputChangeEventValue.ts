import { ethers } from "ethers";
import { TNormalizedBN } from "../format";

export function handleInputChangeEventValue(value: string, decimals?: number): TNormalizedBN {
	let		amount = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
	const	amountParts = amount.split('.');

	if (amountParts.length > 2) {
		throw new Error(`Invalid amount: ${amount}`);
	}

	if (amountParts.length === 2) {
		amount = amountParts[0] + '.' + amountParts[1].slice(0, decimals);
	}

	const	raw = ethers.utils.parseUnits(amount || '0', decimals);
	return ({raw: raw, normalized: amount || '0'});
}
