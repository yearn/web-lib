import	React, {ReactElement, useRef}				from	'react';
import	{Dialog, Transition}						from	'@headlessui/react';
import	{SwitchTheme}								from	'../components/SwitchTheme';
import	{useUI}										from	'../contexts/useUI';
import	{TNavbarOption, TModalMenu, TMobileMenu}	from	'./ModalMenu.d';
import	IconSocialTwitter							from	'../icons/IconSocialTwitter';
import	IconSocialGithub							from	'../icons/IconSocialGithub';
import	IconSocialDiscord							from	'../icons/IconSocialDiscord';
import	IconSocialMedium							from	'../icons/IconSocialMedium';
import	IconCross									from	'../icons/IconCross';

function	MobileMenuItem({option}: {option: TNavbarOption}): ReactElement {
	return (
		<div className={'pb-6 text-dark-blue-1 link'}>
			{option.label}
		</div>
	);
}

function	Menu({options, wrapper, set_selected}: TMobileMenu): ReactElement {
	const	{theme, switchTheme} = useUI();

	return (
		<div className={'flex flex-col justify-between pt-20 h-screen'}>
			<nav className={'flex flex-col pt-2'}>
				{options.map((option): ReactElement  => {
					if (wrapper) {
						return (
							<div key={option.route}>
								{React.cloneElement(
									wrapper,
									{href: option.route},
									<a><MobileMenuItem option={option} /></a>
								)}
							</div>
						);
					}
					return (
						<div
							key={option.route}
							onClick={(): void => set_selected(option.route)}>
							<MobileMenuItem option={option} />
						</div>
					);
				})}
			</nav>

			<div className={'pb-6 mt-auto'}>
				<div className={'flex flex-row justify-center items-center space-x-4'}>
					<div className={'transition-colors text-typo-secondary'}>
						<a
							href={'https://twitter.com/iearnfinance'}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Twitter'}</span>
							<IconSocialTwitter />
						</a>
					</div>
					<div className={'transition-colors text-typo-secondary'}>
						<a
							href={process.env.PROJECT_GITHUB_URL}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Github'}</span>
							<IconSocialGithub />
						</a>
					</div>
					<div className={'transition-colors text-typo-secondary'}>
						<a
							href={'https://discord.yearn.finance/'}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Discord'}</span>
							<IconSocialDiscord />
						</a>
					</div>
					<div className={'transition-colors text-typo-secondary'}>
						<a
							href={'https://medium.com/iearn'}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Medium'}</span>
							<IconSocialMedium />
						</a>
					</div>
					<div>
						<SwitchTheme theme={theme} switchTheme={switchTheme} />
					</div>
				</div>
			</div>
		</div>
	);
}

function	ModalMenu({isOpen, set_isOpen, options, set_selected, wrapper}: TModalMenu): ReactElement {
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
							<Menu options={options} set_selected={set_selected} wrapper={wrapper} />
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export {ModalMenu};