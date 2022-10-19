import	React, {ReactElement, ReactNode}	from	'react';

export type TNavbarOption = {
	route: string;
	values: string | string[];
	label: string;
	icon?: ReactElement;
	options?: TNavbarOption[];
}
  
export type TMobileMenu = {
	options: TNavbarOption[];
	set_selected: React.Dispatch<React.SetStateAction<string>> | ((option: string) => void);
	wrapper: ReactElement;
}

export type TModalMenu = {
	options: TNavbarOption[];
	isOpen: boolean,
	set_isOpen: React.Dispatch<React.SetStateAction<boolean>>
	set_selected: React.Dispatch<React.SetStateAction<string>> | ((option: string) => void);
	wrapper: ReactElement;
}

export type	TModalMobileMenu = {
	isOpen: boolean
	shouldUseWallets: boolean
	shouldUseNetworks: boolean
	onClose: () => void
	children: ReactNode
};
