import {TAddress} from '../utils/utils';

export type TAddressWithActions = {
	address: TAddress;
	explorer: string;
	truncate?: number;
	wrapperClassName?: string;
	className?: string;
};
