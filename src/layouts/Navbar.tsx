import	React, {ReactElement}	from	'react';
import	IconHamburger			from	'../icons/IconHamburger';
import	{ModalMenu}				from	'../components/ModalMenu';
import	* as NavbarTypes		from	'./Navbar.d';

function	NavbarMenuItem({option, selected}: NavbarTypes.TMenuItem): ReactElement {
	return (
		<div className={'group flex flex-row items-center'}>
			<div className={`mr-4 transition-colors py-1 cursor-pointer ${option.values.includes(selected) ? 'text-primary' : 'text-typo-secondary group-hover:text-primary'}`}>
				{React.cloneElement(option.icon, {className: 'w-6 min-w-[1.5rem] h-6'})}
			</div>
			<p className={`transition-colors py-1 cursor-pointer ${option.values.includes(selected) ? 'text-primary' : 'text-typo-secondary group-hover:text-primary'}`}>
				{option.label}
			</p>
		</div>
	);
}

function	NavbarMenuSubItem({option, selected}: NavbarTypes.TMenuItem): ReactElement {
	return (
		<div className={'group flex flex-row items-center'}>
			<div className={'py-1 mr-4 w-6 min-w-[1.5rem] h-6 cursor-pointer'} />
			<p className={`transition-colors py-1 cursor-pointer ${option.values.includes(selected) ? 'text-primary' : 'text-typo-secondary group-hover:text-primary'}`}>
				{option.label}
			</p>
		</div>
	);
}

function	Navbar({
	options,
	logo,
	title,
	selected,
	set_selected,
	children,
	wrapper,
	...props
}: NavbarTypes.TNavbar): ReactElement {
	const	[hasOpenMenu, set_hasOpenMenu] = React.useState(false);

	return (
		<aside
			aria-label={'aside-navigation'}
			className={'relative top-0 pt-0 w-auto min-w-full md:sticky md:pt-9 md:w-full md:min-w-[10rem]'}
			{...props}>
			<div
				aria-label={'dektop-navigation'}
				className={'hidden flex-col md:flex'}
				style={{height: 'calc(100vh - 4.50rem)'}}>
				<a href={'/'}>
					<div className={'flex flex-row items-center cursor-pointer'}>
						<span className={'sr-only'}>{'Home'}</span>
						<div className={title ? 'mr-4' : ''}>
							{React.cloneElement(logo)}
						</div>
						{title ? <h1 className={'lowercase'}>{title}</h1> : null}
					</div>
				</a>
				<nav className={'flex overflow-y-scroll flex-col mt-12 space-y-4 max-h-[75vh]'}>
					{options.map((option): ReactElement  => {
						if (wrapper) {
							return (
								<div key={option.route} className={'space-y-2'}>
									{React.cloneElement(
										wrapper,
										{href: option.route},
										<a><NavbarMenuItem option={option} selected={selected} /></a>
									)}
									{(option.options || [])?.map((subOption): ReactElement => (
										<div key={subOption.route}>
											{React.cloneElement(
												wrapper,
												{href: subOption.route},
												<a><NavbarMenuSubItem option={subOption} selected={selected} /></a>
											)}
										</div>
									))}
								</div>
							);
						}
						return (
							<div
								key={option.route}
								onClick={(): void => set_selected(option.route)}
								className={'space-y-2'}>
								<NavbarMenuItem option={option} selected={selected} />
								{(option.options || [])?.map((subOption): ReactElement => (
									<div
										key={subOption.route}
										onClick={(): void => set_selected(subOption.route)}>
										<NavbarMenuSubItem option={subOption} selected={selected} />
									</div>
								))}
							</div>
						);
					})}
				</nav>
				{children}
			</div>
			<div
				aria-label={'mobile-navigation'}
				className={'flex flex-row justify-between items-center p-4 border-b md:hidden bg-surface border-background-variant'}>
				<a href={'/'}>
					<div className={'flex flex-row items-center cursor-pointer'}>
						<span className={'sr-only'}>{'Home'}</span>
						<div className={title ? 'mr-4' : ''}>
							{React.cloneElement(logo, {className: `h-8 ${logo.props.className}`})}
						</div>
						{title ? <h1 className={'lowercase'}>{title}</h1> : null}
					</div>
				</a>
				<div
					onClick={(): void => set_hasOpenMenu(true)}
					className={'p-1 -m-1'}>
					<IconHamburger className={'w-8 h-8 text-typo-primary'} />
				</div>
				<ModalMenu
					isOpen={hasOpenMenu}
					set_isOpen={set_hasOpenMenu}
					set_selected={set_selected}
					options={options}
					wrapper={wrapper} />
			</div>
		</aside>
	);
}

export {Navbar};