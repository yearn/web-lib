import type {TAddress} from '@yearn-finance/web-lib/utils';

export type TAddressWithActions = {
	address: TAddress;
	explorer: string;
	truncate?: number;
	wrapperClassName?: string;
	className?: string;
};
