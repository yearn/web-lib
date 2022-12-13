import React, {Fragment} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Disclosure, Tab} from '@headlessui/react';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';

import type {ReactElement} from 'react';

export type TCard = {
	className?: string;
	variant?: 'surface' | 'background';
	padding?: 'none' | 'narrow' | 'regular';
	onClick?: React.MouseEventHandler;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'section'>;

export type TCardDetailSummary = {
	startChildren?: React.ReactNode;
	endChildren?: React.ReactNode;
	open?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export type TCardWithTabsOption = {
	label: string;
	children: ReactElement;
}

export type TCardWithTabs = {
	tabs: TCardWithTabsOption[];
}

export type TCardDetail = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	summary?: TCardDetailSummary | ReactElement | ((p: unknown) => ReactElement | TCardDetailSummary) | any;
	variant?: 'surface' | 'background';
	isSticky?: boolean;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

function	CardDetailsSummary({startChildren, endChildren, open, ...props}: TCardDetailSummary): ReactElement{
	return (
		<div
			className={'rounded-default flex w-full cursor-pointer flex-col items-start justify-between p-6 md:flex-row md:items-center'}
			{...props}>
			<div className={'w-inherit'}>
				{startChildren}
			</div>
			<div className={'mt-4 flex w-full flex-row items-center md:mt-0'}>
				{endChildren}
				<div className={'ml-auto'}>
					<IconChevron
						className={`text-primary-500 h-6 w-6 transition-transform ${open ? '-rotate-90' : '-rotate-180'}`} />
				</div>
			</div>
		</div>
	);
}

function	CardDetails(props: TCardDetail): ReactElement {
	const {summary, variant = 'surface', isSticky = true, children} = props;

	return (
		<Disclosure>
			{({open}): ReactElement => (
				<div className={`w-full cursor-pointer ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'} rounded-default p-0 shadow-none`}>
					<Disclosure.Button
						as={'div'}
						role={'button'}
						tabIndex={0}
						className={`rounded-default h-full w-full justify-between text-justify transition-colors ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'} ${open ? '' : 'hover:bg-neutral-100'} ${isSticky ? 'relative top-0 md:sticky' : ''}`}>
						{summary}
					</Disclosure.Button>
					<AnimatePresence initial={false}>
						{open && (
							<motion.section
								key={'content'}
								initial={'collapsed'}
								animate={'open'}
								exit={'collapsed'}
								variants={{open: {opacity: 1, height: 'auto'}, collapsed: {opacity: 0, height: 0}}}
								transition={{duration: 0.3, linear: true}}
							>
								<Disclosure.Panel
									static
									className={`rounded-b-default w-full px-6 pb-6 ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'}`}>
									{children}
								</Disclosure.Panel>
							</motion.section>
						)}
					</AnimatePresence>
				</div>
			)}
		</Disclosure>
	);
}

function	CardWithTabs(props: TCardWithTabs): ReactElement {
	const	{tabs} = props;

	return (
		<div>
			<Tab.Group>
				<Tab.List
					className={'yearn--card yearn--card-tab'}
					style={{padding: 0}}>
					{tabs.map((option: TCardWithTabsOption): ReactElement => (
						<Tab
							key={option.label}
							as={'div'}
							className={({selected}: {selected: boolean}): string => `yearn--card-tab-item ${selected ? 'selected' : ''}`}>
							<p className={'text-center text-lg'}>{option.label}</p>
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className={'w-full rounded-t-none'}>
					{tabs.map((option: TCardWithTabsOption): ReactElement => (
						<Tab.Panel key={option.label} as={Fragment}>
							<section
								className={'yearn--card'}
								style={{
									borderTopRightRadius: 0,
									borderTopLeftRadius: 0
								}}>
								{option.children}
							</section>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

function	CardBase(props: TCard): ReactElement {
	const {children, onClick, padding = 'regular', variant = 'surface', ...rest} = props;

	return (
		<section
			role={onClick ? 'button' : undefined}
			data-variant={variant}
			data-padding={padding}
			className={`yearn--card ${rest.className ? rest.className : ''}`}
			onClick={onClick}
			{...rest}>
			{children}
		</section>
	);
}

export {CardWithTabs};
export const Card = Object.assign(CardBase, {
	Detail: Object.assign(CardDetails, {Summary: CardDetailsSummary}),
	Tabs: CardWithTabs
});
