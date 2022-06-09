import React, {ReactElement} from 'react';
import {Disclosure, Tab} from '@headlessui/react';
import {motion, AnimatePresence} from 'framer-motion';
import IconChevron from '../icons/IconChevron';
import * as CardTypes from './Card.d';

function	CardDetailsSummary({startChildren, endChildren, ...props}: CardTypes.TCardDetailSummary): ReactElement{
	return (
		<div className={'flex flex-col justify-between items-start p-6 w-full rounded-lg cursor-pointer md:flex-row md:items-center'} {...props}>
			<div className={'w-inherit'}>
				{startChildren}
			</div>
			<div className={'flex flex-row items-center mt-4 w-full md:mt-0'}>
				{endChildren}
				<div className={'ml-auto'}>
					<IconChevron
						className={`w-6 h-6 text-primary-500 transition-transform ${props.open ? '-rotate-90' : '-rotate-180'}`} />
				</div>
			</div>
		</div>
	);
}

function	CardDetails({summary, variant = 'surface', isSticky = true, children}: CardTypes.TCardDetail): ReactElement {
	return (
		<Disclosure>
			{({open}): ReactElement => (
				<div className={`w-full cursor-pointer ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'} shadow-none rounded-lg p-0`}>
					<Disclosure.Button
						as={'div'}
						role={'button'}
						tabIndex={0}
						className={`w-full h-full justify-between rounded-lg text-justify transition-colors ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'} ${open ? '' : 'hover:bg-neutral-100'} ${isSticky ? 'relative md:sticky top-0' : ''}`}>
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
									className={`px-6 pb-6 w-full rounded-b-lg ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'}`}>
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

function	CardWithTabs({tabs}: CardTypes.TCardWithTabs): ReactElement {
	return (
		<div>
			<Tab.Group>
				<Tab.List
					as={Card}
					className={'yearn--card-tab'}
					padding={'none'}>
					{tabs.map((option: CardTypes.TCardWithTabsOption): ReactElement => (
						<Tab
							key={option.label}
							as={'div'}
							className={({selected}: {selected: boolean}): string => `yearn--card-tab-item ${selected ? 'selected' : ''}`}>
							<p className={'text-lg text-center'}>{option.label}</p>
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className={'w-full rounded-t-none'}>
					{tabs.map((option: CardTypes.TCardWithTabsOption): ReactElement => (
						<Tab.Panel key={option.label} as={React.Fragment}>
							<Card className={'rounded-t-none'}>
								{option.children}
							</Card>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

function	CardBase({
	children,
	onClick,
	padding = 'regular',
	variant = 'surface',
	className,
	...props
}: CardTypes.TCard): ReactElement {
	return (
		<section
			role={onClick ? 'button' : undefined}
			data-variant={variant}
			data-padding={padding}
			className={`yearn--card ${className ?? ''}`}
			onClick={onClick}
			{...props}>
			{children}
		</section>
	);
}

export const Card = Object.assign(CardBase, {
	Detail: Object.assign(CardDetails, {Summary: CardDetailsSummary}),
	Tabs: CardWithTabs
});