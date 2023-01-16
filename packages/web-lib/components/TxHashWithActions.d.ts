import type { ReactElement } from 'react';
export type TTxHashWithActions = {
    txHash: string;
    explorer: string;
    truncate?: number;
    wrapperClassName?: string;
    className?: string;
};
declare function TxHashWithActions(props: TTxHashWithActions): ReactElement;
export { TxHashWithActions };
