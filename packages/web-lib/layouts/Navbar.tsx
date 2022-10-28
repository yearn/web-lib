'use client';

import React, {cloneElement, ReactElement, useState} from 'react';
import {ModalMenu} from '@yearn-finance/web-lib/components/ModalMenu';
import IconHamburger from '@yearn-finance/web-lib/icons/IconHamburger';

import type * as NavbarTypes from './Navbar.d';

function	NavbarMenuItem({option, selected}: NavbarTypes.TMenuItem): ReactElement {
	return (
		<div className={'group flex flex-row items-center'}>
			<div className={`mr-4 cursor-pointer py-1 transition-colors ${option.values.includes(selected) ? 'text-primary-500' : 'group-hover:text-primary-500 text-neutral-500'}`}>
				{option.icon ? (
					cloneElement(option.icon, {className: 'w-6 min-w-[1.5rem] h-6'})
				) : (
					<div className={'mr-4 h-6 w-6 min-w-[1.5rem] cursor-pointer py-1'} />
				)}
			</div>
			<p className={`cursor-pointer py-1 transition-colors ${option.values.includes(selected) ? 'text-primary-500' : 'group-hover:text-primary-500 text-neutral-500'}`}>
				{option.label}
			</p>
		</div>
	);
}

function	NavbarMenuSubItem({option, selected}: NavbarTypes.TMenuItem): ReactElement {
	return (
		<div className={'group flex flex-row items-center'}>
			<div className={'mr-4 h-6 w-6 min-w-[1.5rem] cursor-pointer py-1'} />
			<p className={`cursor-pointer py-1 transition-colors ${option.values.includes(selected) ? 'text-primary-500' : 'group-hover:text-primary-500 text-neutral-500'}`}>
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
	const	[hasOpenMenu, set_hasOpenMenu] = useState(false);

	return (
		<aside
			aria-label={'aside-navigation'}
			className={'relative top-0 w-auto min-w-full pt-0 md:sticky md:w-full md:min-w-[10rem] md:pt-9'}
			{...props}>
			<div
				aria-label={'dektop-navigation'}
				className={'hidden flex-col md:flex'}
				style={{height: 'calc(100vh - 4.50rem)'}}>
				<a href={'/'}>
					<div className={'flex cursor-pointer flex-row items-center'}>
						<span className={'sr-only'}>{'Home'}</span>
						<div className={title ? 'mr-4' : ''}>
							{cloneElement(logo)}
						</div>
						{title ? <h1 className={'lowercase'}>{title}</h1> : null}
					</div>
				</a>
				<nav className={'scrollbar-none mt-12 flex max-h-[75vh] flex-col space-y-4 overflow-y-auto'}>
					{options.map((option): ReactElement  => {
						if (wrapper) {
							return (
								<div key={option.route} className={'space-y-2'}>
									{cloneElement(
										wrapper,
										{href: option.route},
										<a><NavbarMenuItem option={option} selected={selected} /></a>
									)}
									{(option.options || [])?.map((subOption): ReactElement => (
										<div key={subOption.route}>
											{cloneElement(
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
				className={'bg-neutral-0 flex flex-row items-center justify-between border-b border-neutral-300 p-4 md:hidden'}>
				<a href={'/'}>
					<div className={'flex cursor-pointer flex-row items-center'}>
						<span className={'sr-only'}>{'Home'}</span>
						<div className={title ? 'mr-4' : ''}>
							{cloneElement(logo, {className: `h-8 ${logo.props.className}`})}
						</div>
						{title ? <h1 className={'lowercase'}>{title}</h1> : null}
					</div>
				</a>
				<div
					onClick={(): void => set_hasOpenMenu(true)}
					className={'-m-1 p-1'}>
					<IconHamburger className={'h-8 w-8 text-neutral-700'} />
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