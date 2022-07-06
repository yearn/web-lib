import	React, {ReactElement, useRef}	from	'react';
import	{Dialog, Transition}			from	'@headlessui/react';
import * as ModalTypes					from 	'./Modal.d';

function	Modal({isOpen, onClose, className = '', children}: ModalTypes.TModal): ReactElement {
	const	ref = useRef() as React.MutableRefObject<HTMLDivElement>;

	return (
		<Transition.Root show={isOpen} as={React.Fragment}>
			<Dialog
				as={'div'}
				className={'overflow-y-auto fixed inset-0'}
				style={{zIndex: 9999}}
				initialFocus={ref}
				onClose={onClose}>
				<div className={'yearn--modal-wrapper'}>
					<Transition.Child
						as={React.Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'yearn--modal-overlay'} />
					</Transition.Child>

					<span className={'hidden sm:inline-block sm:h-screen sm:align-middle'} aria-hidden={'true'}>
						&#8203;
					</span>
					<Transition.Child
						as={React.Fragment}
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