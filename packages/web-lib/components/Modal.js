import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
function Modal(props) {
    const { isOpen, onClose, className = '', children } = props;
    const ref = useRef();
    return (React.createElement(Transition.Root, { show: isOpen, as: Fragment },
        React.createElement(Dialog, { as: 'div', className: 'fixed inset-0 overflow-y-auto', style: { zIndex: 9999 }, initialFocus: ref, onClose: onClose },
            React.createElement("div", { className: `${className} yearn--modal-wrapper` },
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0', enterTo: 'opacity-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                    React.createElement(Dialog.Overlay, { className: `${className} yearn--modal-overlay` })),
                React.createElement("span", { className: 'hidden sm:inline-block sm:h-screen sm:align-middle', "aria-hidden": 'true' }, "\u200B"),
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', enterTo: 'opacity-100 translate-y-0 sm:scale-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100 translate-y-0 sm:scale-100', leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' },
                    React.createElement("div", { ref: ref, className: `${className} yearn--modal` }, children))))));
}
export { Modal };
