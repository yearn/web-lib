import {ReactElement} from 'react';

export type TModal = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactElement;
};
