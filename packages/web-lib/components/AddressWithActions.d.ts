import type { ReactElement } from 'react';
import type { TAddress } from '@yearn-finance/web-lib/utils/address';
export type TAddressWithActions = {
    address: TAddress;
    explorer: string;
    truncate?: number;
    wrapperClassName?: string;
    className?: string;
};
declare function AddressWithActions(props: TAddressWithActions): ReactElement;
export { AddressWithActions };
