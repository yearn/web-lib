import	React, {ReactElement, useRef}	from	'react';
import	{Dialog, Transition}			from	'@headlessui/react';
import	IconSocialTwitter				from	'../icons/IconSocialTwitter';
import	IconSocialGithub				from	'../icons/IconSocialGithub';
import	IconSocialDiscord				from	'../icons/IconSocialDiscord';
import	IconSocialMedium				from	'../icons/IconSocialMedium';
import	IconCross						from	'../icons/IconCross';

function	Menu(): ReactElement {
	return (
		<div className={'flex flex-col justify-between pt-20 h-screen'}>
			<div className={'flex flex-col pt-2'}>
				<a href={'https://docs.yearn.finance'} target={'_blank'} className={'pb-6 text-dark-blue-1 link'} rel={'noreferrer'}>
					{'Documentation'}
				</a>
				<a href={'https://gov.yearn.finance/'} target={'_blank'} className={'pb-6 text-dark-blue-1 link'} rel={'noreferrer'}>
					{'Governance forum'}
				</a>
				<a href={'https://github.com/yearn/yearn-security/blob/master/SECURITY.md'} target={'_blank'} className={'text-dark-blue-1 link'} rel={'noreferrer'}>
					{'Report a vulnerability'}
				</a>
			</div>

			<div className={'pb-6 mt-auto'}>
				<p className={'pb-6 text-dark-blue-1'}>
					{'Data provided by '}
					<a href={'https://www.yfistats.com/'} target={'_blank'} rel={'noreferrer'} className={'text-yearn-blue'}>
						{'yfistats'}
					</a>
				</p>

				<div className={'flex flex-row justify-center items-center space-x-4'}>
					<div className={'transition-colors cursor-pointer text-gray-blue-1 hover:text-gray-blue-2'}>
						<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'}><IconSocialTwitter /></a>
					</div>
					<div className={'transition-colors cursor-pointer text-gray-blue-1 hover:text-gray-blue-2'}>
						<a href={process.env.PROJECT_GITHUB_URL} target={'_blank'} rel={'noreferrer'}><IconSocialGithub /></a>
					</div>
					<div className={'transition-colors cursor-pointer text-gray-blue-1 hover:text-gray-blue-2'}>
						<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'}><IconSocialDiscord /></a>
					</div>
					<div className={'transition-colors cursor-pointer text-gray-blue-1 hover:text-gray-blue-2'}>
						<a href={'https://medium.com/iearn'} target={'_blank'} rel={'noreferrer'}><IconSocialMedium /></a>
					</div>
				</div>
			</div>
		</div>
	);
}

type		TModalMenu = {isOpen: boolean, set_isOpen: React.Dispatch<React.SetStateAction<boolean>>}
function	ModalMenu({isOpen, set_isOpen}: TModalMenu): ReactElement {
	const	ref = useRef() as React.MutableRefObject<HTMLDivElement>;

	return (
		<Transition.Root show={isOpen} as={React.Fragment}>
			<Dialog
				static
				className={'overflow-hidden fixed inset-0 w-screen h-screen'}
				style={{zIndex: 9999999}}
				initialFocus={ref}
				open={isOpen}
				onClose={set_isOpen}>
				<div
					className={'flex justify-center items-start min-h-screen text-center backdrop-blur transition-opacity'}
					style={{background: 'rgba(255,255,255,0.68)'}}>
					<Transition.Child
						as={React.Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 z-10'} />
					</Transition.Child>

					<Transition.Child
						as={React.Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
						enterTo={'opacity-100 translate-y-0 sm:scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
						leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
						<div className={'relative z-50 w-full h-full transition-all'}>
							<div
								ref={ref}
								className={'absolute top-4 right-2'}
								onClick={(): void => set_isOpen(false)}>
								<IconCross />
							</div>
							<Menu />
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export {ModalMenu};