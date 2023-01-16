import React from 'react';
import type { ReactElement, ReactNode } from 'react';
export type TModal = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;
declare function Modal(props: TModal): ReactElement;
export { Modal };
