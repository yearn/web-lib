import React from 'react';
import type { ReactElement } from 'react';
export type TNavbarOption = {
    route: string;
    values: string | string[];
    label: string;
    icon?: ReactElement;
    options?: TNavbarOption[];
};
export type TNavbar = {
    options: TNavbarOption[];
    logo: ReactElement;
    title?: string;
    selected: string;
    set_selected: React.Dispatch<React.SetStateAction<string>> | ((option: string) => void);
    children?: ReactElement;
    wrapper: ReactElement;
};
export type TMenuItem = {
    option: TNavbarOption;
    selected: string;
};
declare function Navbar({ options, logo, title, selected, set_selected, children, wrapper, ...props }: TNavbar): ReactElement;
export { Navbar };
