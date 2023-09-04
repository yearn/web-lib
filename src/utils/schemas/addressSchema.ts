import {z} from 'zod';

import type {TAddress} from '../../types/index.js';

export const ADDRESS_REGEX = new RegExp(/^0x[0-9a-f]{40}$/i);

export const addressSchema = z.custom<TAddress>((val): boolean => {
	return ADDRESS_REGEX.test(val as TAddress);
});
