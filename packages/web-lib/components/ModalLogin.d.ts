import type { ReactElement } from 'react';
export type TModalLogin = {
    isOpen: boolean;
    onClose: () => void;
};
declare function ModalLogin(props: TModalLogin): ReactElement;
export { ModalLogin };
