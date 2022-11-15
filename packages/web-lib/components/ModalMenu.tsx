import React, {cloneElement, Fragment, ReactElement, ReactNode, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {SwitchTheme} from '@yearn-finance/web-lib/components/SwitchTheme';
import {useUI} from '@yearn-finance/web-lib/contexts';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';
import IconSocialDiscord from '@yearn-finance/web-lib/icons/IconSocialDiscord';
import IconSocialGithub from '@yearn-finance/web-lib/icons/IconSocialGithub';
import IconSocialMedium from '@yearn-finance/web-lib/icons/IconSocialMedium';
import IconSocialTwitter from '@yearn-finance/web-lib/icons/IconSocialTwitter';

export type TNavbarOption = {
	route: string;
	values: string | string[];
	label: string;
	icon?: ReactElement;
	options?: TNavbarOption[];
}

export type TMobileMenu = {
	options: TNavbarOption[];
	set_selected: React.Dispatch<React.SetStateAction<string>> | ((option: string) => void);
	wrapper: ReactElement;
}

export type TModalMenu = {
	options: TNavbarOption[];
	isOpen: boolean,
	set_isOpen: React.Dispatch<React.SetStateAction<boolean>>
	set_selected: React.Dispatch<React.SetStateAction<string>> | ((option: string) => void);
	wrapper: ReactElement;
}

export type	TModalMobileMenu = {
	isOpen: boolean
	shouldUseWallets: boolean
	shouldUseNetworks: boolean
	onClose: () => void
	children: ReactNode
};

function	MobileMenuItem({option}: {option: TNavbarOption}): ReactElement {
	return (
		<div className={'text-dark-blue-1 link pb-6'}>
			{option.label}
		</div>
	);
}

function	Menu(props: TMobileMenu): ReactElement {
	const	{options, wrapper, set_selected} = props;
	const	{theme, switchTheme} = useUI();

	return (
		<div className={'flex h-screen flex-col justify-between pt-20'}>
			<nav className={'flex flex-col pt-2'}>
				{options.map((option): ReactElement  => {
					if (wrapper) {
						return (
							<div key={option.route}>
								{cloneElement(
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

			<div className={'mt-auto pb-6'}>
				<div className={'flex flex-row items-center justify-center space-x-4'}>
					<div className={'text-neutral-500 transition-colors'}>
						<a
							href={'https://twitter.com/iearnfinance'}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Twitter'}</span>
							<IconSocialTwitter />
						</a>
					</div>
					<div className={'text-neutral-500 transition-colors'}>
						<a
							href={process.env.PROJECT_GITHUB_URL}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Github'}</span>
							<IconSocialGithub />
						</a>
					</div>
					<div className={'text-neutral-500 transition-colors'}>
						<a
							href={'https://discord.yearn.finance/'}
							target={'_blank'}
							rel={'noreferrer'}>
							<span className={'sr-only'}>{'Discord'}</span>
							<IconSocialDiscord />
						</a>
					</div>
					<div className={'text-neutral-500 transition-colors'}>
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

function	ModalMenu(props: TModalMenu): ReactElement {
	const	{isOpen, set_isOpen, options, set_selected, wrapper} = props;
	const	ref = useRef() as React.MutableRefObject<HTMLDivElement>;

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				static
				className={'fixed inset-0 h-screen w-screen overflow-hidden'}
				style={{zIndex: 9999999}}
				initialFocus={ref}
				open={isOpen}
				onClose={set_isOpen}>
				<div
					className={'flex min-h-screen items-start justify-center text-center backdrop-blur transition-opacity'}
					style={{background: 'rgba(255,255,255,0.68)'}}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0'}
						enterTo={'opacity-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100'}
						leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 z-10'} />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
						enterTo={'opacity-100 translate-y-0 sm:scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
						leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
						<div className={'relative z-50 h-full w-full transition-all'}>
							<div
								ref={ref}
								className={'absolute top-4 right-2'}
								onClick={(): void => set_isOpen(false)}>
								<IconCross />
							</div>
							<Menu
								options={options}
								set_selected={set_selected}
								wrapper={wrapper} />
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export {ModalMenu};
