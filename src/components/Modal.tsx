import	React, {ReactElement, useRef}	from	'react';
import	{Dialog, Transition}			from	'@headlessui/react';

type		TModal = {
	isOpen: boolean,
	onClose: () => void
	children: ReactElement,
}
function	Modal({isOpen, onClose, children}: TModal): ReactElement {
	const	ref = useRef() as React.MutableRefObject<HTMLDivElement>;

	return (
		<Transition.Root show={isOpen} as={React.Fragment}>
			<Dialog
				as={'div'}
				className={'overflow-y-auto fixed inset-0'}
				style={{zIndex: 9999999}}
				initialFocus={ref}
				open={isOpen}
				onClose={onClose}>
				<div className={'flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0'}>
					<Transition.Child
						as={React.Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 z-10 opacity-50 transition-opacity bg-dark'} />
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
						<div ref={ref} className={'inline-block overflow-hidden relative z-50 text-left align-bottom rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle md:mb-96 bg-surface'}>
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export {Modal};