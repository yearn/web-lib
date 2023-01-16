import React from 'react';
import type { ReactElement } from 'react';
export type TDropdownOption = {
    icon?: ReactElement;
    value: string | number;
    label: string;
};
export type TDropdownProps = {
    options: TDropdownOption[];
    defaultOption: TDropdownOption;
    selected: TDropdownOption;
    onSelect: React.Dispatch<React.SetStateAction<TDropdownOption>> | ((option: TDropdownOption) => void);
};
declare function Dropdown(props: TDropdownProps): ReactElement;
export { Dropdown };
