import {toAddress} from './address.js';
import {ETH_TOKEN_ADDRESS} from './constants.js';

import type {TAddress} from '../types/index.js';

export function isEth(address?: string | null | TAddress): boolean {
	return toAddress(address) === toAddress(ETH_TOKEN_ADDRESS);
}
