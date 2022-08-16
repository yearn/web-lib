import {ReactNode} from "react";

export type	TModalMobileMenu = {
	isOpen: boolean
	shouldUseWallets: boolean
	shouldUseNetworks: boolean
	onClose: () => void
	children: ReactNode
};
