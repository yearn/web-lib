import type {TAddress} from '@majorfi/web-lib/utils';

export type TAddressWithActions = {
	address: TAddress;
	explorer: string;
	truncate?: number;
	wrapperClassName?: string;
	className?: string;
};
