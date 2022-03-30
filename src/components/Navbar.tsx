import	React, {ReactElement}	from	'react';
import	IconHamburger			from	'../icons/IconHamburger';
import	{ModalMenu}				from	'./ModalMenu';

export type TNavbarOption = {
	id: string;
	values: string | string[];
	label: string;
	icon: ReactElement;
}
  
export type TNavbarProps = {
	options: TNavbarOption[];
	logo: ReactElement;
	title?: string;
	selected: string;
	set_selected: React.Dispatch<React.SetStateAction<string>> | ((option: string) => void);
	children?: ReactElement;
}

function Navbar({options, logo, title, selected, set_selected, children, ...props}: TNavbarProps): ReactElement {
	const	[hasOpenMenu, set_hasOpenMenu] = React.useState(false);
	return (
		<aside className={'relative top-0 pt-0 w-auto min-w-full md:sticky md:pt-9 md:w-40 md:min-w-[10rem]'} {...props}>
			<div className={'hidden flex-col md:flex'} style={{height: 'calc(100vh - 4.50rem)'}}>
				<a href={'/'}>
					<div className={'flex flex-row items-center cursor-pointer'}>
						<div className={title ? 'mr-4' : ''}>
							{React.cloneElement(logo)}
						</div>
						<h1 className={'lowercase'}>
							{title}
						</h1>
					</div>
				</a>
				<nav className={'flex flex-col mt-12 space-y-4'}>
					{options.map((option): ReactElement => (
						<div
							key={option.id}
							className={'group flex flex-row items-center'}
							onClick={(): void => set_selected(option.id)}>
							<div className={`mr-4 transition-colors py-1 cursor-pointer ${option.values.includes(selected) ? 'text-primary' : 'text-typo-secondary group-hover:text-primary'}`}>
								{React.cloneElement(option.icon, {className: 'w-6 h-6'})}
							</div>
							<p className={`transition-colors py-1 cursor-pointer ${option.values.includes(selected) ? 'text-primary' : 'text-typo-secondary group-hover:text-primary'}`}>
								{option.label}
							</p>
						</div>
					))}
				</nav>
				{children}
			</div>
			<div className={'flex flex-row justify-between items-center p-4 border-b md:hidden bg-surface border-background-variant'}>
				<a href={'/'}>
					<div className={'flex flex-row items-center cursor-pointer'}>
						<div className={title ? 'mr-4' : ''}>
							{React.cloneElement(logo, {className: `h-8 ${logo.props.className}`})}
						</div>
						<h1 className={'lowercase'}>
							{title}
						</h1>
					</div>
				</a>
				<div
					onClick={(): void => set_hasOpenMenu(true)}
					className={'p-1 -m-1'}>
					<IconHamburger className={'w-8 h-8 text-typo-primary'} />
				</div>
				<ModalMenu isOpen={hasOpenMenu} set_isOpen={set_hasOpenMenu} />
			</div>
		</aside>
	);
}

export {Navbar};