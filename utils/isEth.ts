import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {ETH_TOKEN_ADDRESS} from '@yearn-finance/web-lib/utils/constants';

import type {TAddress} from '@yearn-finance/web-lib/types';

export function isEth(address?: string | null | TAddress): boolean {
	return toAddress(address) === toAddress(ETH_TOKEN_ADDRESS);
}
