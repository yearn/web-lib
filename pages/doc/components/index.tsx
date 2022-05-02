import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{Card, AlertBanner, Button}	from	'@yearn/web-lib/components';
import	{RadialBackground}			from	'components/RadialBackground';
import	{CardComponent}				from	'pages/doc/components/cards';
import	{CardTabsComponent}			from	'pages/doc/components/cards-tabs';
import	{CardDetailsComponent}		from	'pages/doc/components/cards-details';
import	{SwitchComponent}			from	'pages/doc/components/switch';
import	{SwitchThemeComponent}		from	'pages/doc/components/switch-theme';
import	{ButtonsComponent}			from	'pages/doc/components/button';
import	{DropdownComponent}			from	'pages/doc/components/dropdown';
import	{SearchBoxComponent}		from	'pages/doc/components/search-box';
import	{StatsCardComponent}		from	'pages/doc/components/statistic-card';
import	{DescriptionListComponent}	from	'pages/doc/components/description-list';
import	{AddressActionComponent}	from	'pages/doc/components/address-with-actions';
import	{HashActionComponent}		from	'pages/doc/components/txhash-with-actions';
import	{AlertBannerComponent}		from	'pages/doc/components/alert-banner';
import	{AlertBoxComponent}			from	'pages/doc/components/alert-box';
import	{ModalComponent}			from	'pages/doc/components/modal';

const		ElementListCards = [
	{
		title: 'Card',
		version: '0.1.0',
		href: '/doc/components/cards',
		description: 'The Card is one of the main wrapper for the UI components, displayed on a surface.',
		children: <CardComponent />
	},
	{
		title: 'Card.Tabs',
		version: '0.1.0',
		href: '/doc/components/cards-tabs',
		description: 'The Card.Tabs is a variant of Card that will display the Card with some available Tabs.',
		children: <div />//<CardTabsComponent />
	},
	{
		title: 'Card.Detail',
		version: '0.1.0',
		href: '/doc/components/cards-details',
		description: 'The Detail variant of the Card is an attempt to replicate how the <detail> and <summary> htmls tags are working.',
		children: <CardDetailsComponent />
	}
];

const		ElementListForms = [
	{
		title: 'Switch',
		version: '0.1.0',
		href: '/doc/components/switch',
		description: 'A basic Switch component, accepting a boolean and switching this boolean.',
		children: <SwitchComponent />
	},
	{
		title: 'Button',
		version: '0.1.0',
		href: '/doc/components/button',
		description: 'Well it\'s nothing more than a button. It comes in 3 variants for each theme: filled (default), outlined and light.',
		children: <ButtonsComponent />
	},
	{
		title: 'Dropdown',
		version: '0.1.0',
		href: '/doc/components/dropdown',
		description: 'The Dropdown component is used to create what is known as <select> in regular HTML.',
		children: <DropdownComponent />
	},
	{
		title: 'SearchBox',
		version: '0.1.0',
		href: '/doc/components/search-box',
		description: 'The SearchBox is an <input> wrapped in a Card with no padding. It should be used to search an element.',
		children: <SearchBoxComponent />
	},
	{
		title: 'SwitchTheme',
		version: '0.1.0',
		href: '/doc/components/switch-theme',
		description: 'A custom switch component to alternate between light theme (default) and dark theme.',
		children: <SwitchThemeComponent />
	}
];

const		ElementListDataDisplay = [
	{
		title: 'StatisticCard',
		version: '0.1.0',
		href: '/doc/components/statistic-card',
		description: 'The StatisticCard is a simple component used to display, in a Card, a label and a value.',
		children: <StatsCardComponent />
	},
	{
		title: 'DescriptionList',
		version: '0.1.0',
		href: '/doc/components/description-list',
		description: 'The DescriptionList component is a mimic of the <dl> HTML element.',
		children: <DescriptionListComponent />
	},
	{
		title: 'AddressWithActions',
		version: '0.1.0',
		href: '/doc/components/address-with-actions',
		description: 'The AddressWithActions is generic component that could be used to display an address with some defaults action.',
		children: <AddressActionComponent />
	},
	{
		title: 'TxHashWithActions',
		version: '0.1.0',
		href: '/doc/components/txhash-with-actions',
		description: 'The TxHashWithActions is generic component that could be used to display a Tx Hash with some defaults action.',
		children: <HashActionComponent />
	}
];

const		ElementListFeedback = [
	{
		title: 'AlertBanner',
		version: '0.1.0',
		href: '/doc/components/alert-banner',
		description: 'The Alert Banner component is used to display some notice.',
		children: <AlertBannerComponent />
	},
	{
		title: 'AlertBox',
		version: '0.1.0',
		href: '/doc/components/alert-box',
		description: 'The Alert Box component is used to display a group of alerts with the icon matching the alert level.',
		children: <AlertBoxComponent />
	},
	{
		title: 'Modal',
		version: '0.1.0',
		href: '/doc/components/modal',
		description: 'The Modal component will open a portal displayed on top of the UI.',
		children: <ModalComponent />
	}
];


type		TElement = {
	children: ReactElement,
	title: string,
	version: string,
	description: string,
	href: string,
}
function	Element({children, title, version, description, href}: TElement): ReactElement {
	return (
		<Card padding={'none'} className={'flex flex-col h-full shadow-none hover:shadow-md transition-shadow duration-700 animate-weight-normal'}>
			<div className={'flex flex-col h-full square-gradient-default'}>
				{children}
				<RadialBackground />
			</div>
			<div className={'flex flex-col p-4 w-full h-full'}>
				<span className={'flex flex-row justify-between items-center'}>
					<h4>{title}</h4>
					<p className={'text-xs text-typo-secondary'}>{version}</p>
				</span>
				<p className={'mt-2 font-mono text-sm text-typo-secondary'}>
					{description}
				</p>
				<div className={'flex justify-end items-end pt-6 mt-auto'}>
					<Link href={href} passHref>
						<Button variant={'outlined'} className={'h-10'} as={'a'}>
							{'Access documentation'}
						</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}

function	Documentation(): ReactElement {
	return (
		<>
			<AlertBanner
				id={'yComponents'}
				title={'The yComponents'}
				canClose={false}
				maxHeight={'max-height-[350px] md:max-height-[250px]'}>
				<div>
					<p>{'This is a beta version of the documentation. It is not yet complete and will be updated as soon as possible.'}</p>
					<p className={'mt-4'}>{'If you want to contribute to the documentation, please open an issue on the GitHub repository, or just hit the feedback button on the bottom left of that page!'}</p>
				</div>
			</AlertBanner>
			<section aria-label={'documentation list'} className={'mt-8 mb-16 space-y-20'}>
				<section aria-label={'Cards layout elements'}>
					<h1 className={'mb-4 text-3xl text-typo-primary'}>{'Cards'}</h1>
					<div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
						{ElementListCards.map((element, index): ReactElement => (
							<Element key={index} {...element} />
						))}
					</div>
				</section>

				<section aria-label={'Forms elements'}>
					<h1 className={'mb-4 text-3xl text-typo-primary'}>{'Forms'}</h1>
					<div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
						{ElementListForms.map((element, index): ReactElement => (
							<Element key={index} {...element} />
						))}
					</div>
				</section>

				<section aria-label={'Data display elements'}>
					<h1 className={'mb-4 text-3xl text-typo-primary'}>{'Data display'}</h1>
					<div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
						{ElementListDataDisplay.map((element, index): ReactElement => (
							<Element key={index} {...element} />
						))}
					</div>
				</section>

				<section aria-label={'Feedback elements'}>
					<h1 className={'mb-4 text-3xl text-typo-primary'}>{'Feedback'}</h1>
					<div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
						{ElementListFeedback.map((element, index): ReactElement => (
							<Element key={index} {...element} />
						))}
					</div>
				</section>
			</section>
		</>
	);
}

export default Documentation;
