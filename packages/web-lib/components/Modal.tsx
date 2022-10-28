'use client';

import React, {Fragment, ReactElement, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import type {TModal} from './Modal.d';

function	Modal(props: TModal): ReactElement {
	const {isOpen, onClose, className = '', children} = props;
	const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as={'div'}
				className={'fixed inset-0 overflow-y-auto'}
				style={{zIndex: 9999}}
				initialFocus={ref}
				onClose={onClose}>
				<div className={`${className} yearn--modal-wrapper`}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0'}
						enterTo={'opacity-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100'}
						leaveTo={'opacity-0'}>
						<Dialog.Overlay className={`${className} yearn--modal-overlay`} />
					</Transition.Child>

					<span className={'hidden sm:inline-block sm:h-screen sm:align-middle'} aria-hidden={'true'}>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
						enterTo={'opacity-100 translate-y-0 sm:scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
						leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
						<div ref={ref} className={`${className} yearn--modal`}>
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export {Modal};