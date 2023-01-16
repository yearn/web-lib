import type { ReactElement } from 'react';
export type TMenu = {
    path: string;
    label: string | ReactElement;
    target?: string;
};
export type TNavbar = {
    nav: TMenu[];
    linkComponent?: ReactElement;
    currentPathName: string;
};
export type TNetwork = {
    value: number;
    label: string;
};
export type THeader = {
    logo: ReactElement;
    extra?: ReactElement;
    linkComponent?: ReactElement;
    nav: TMenu[];
    supportedNetworks?: number[];
    currentPathName: string;
    onOpenMenuMobile: () => void;
};
declare function Header({ logo, extra, linkComponent, nav, currentPathName, supportedNetworks, onOpenMenuMobile }: THeader): ReactElement;
export default Header;
