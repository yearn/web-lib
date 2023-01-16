import type { ReactElement } from 'react';
type THeader = {
    shouldUseWallets?: boolean;
    shouldUseNetworks?: boolean;
    children: ReactElement;
};
declare function Header({ shouldUseWallets, shouldUseNetworks, children }: THeader): ReactElement;
export { Header };
