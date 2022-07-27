import {ReactNode} from "react";

export type	TModalMobileMenu = {
	isOpen: boolean,
	shouldUseWallets: boolean,
	onClose: () => void
	children: ReactNode
};
