import	React, {ReactElement}						from	'react';
import	Head										from	'next/head';
import	Link										from	'next/link';
import	{AppProps}									from	'next/app';
import	{DefaultSeo}								from	'next-seo';
import	{Header, Navbar}							from	'@yearn/web-lib/layouts';
import	{WithYearn, usePrices, useBalances}			from	'@yearn/web-lib/contexts';
import	{format}									from	'@yearn/web-lib/utils';
import	{AlertError, Hamburger, Home, Dashboard}	from	'@yearn/web-lib/icons';
import	Footer										from	'components/StandardFooter';
import	IconYearn									from	'components/icons/IconYearn';
import	IconHealthcheck								from	'components/icons/IconHealthcheck';

import	'../style.css';

const		YFI_ADDRESS = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e';
function	AppHead(): ReactElement {
	return (
		<>
			<Head>
				<title>{process.env.WEBSITE_NAME}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />
			</Head>
			<DefaultSeo
				title={process.env.WEBSITE_NAME}
				defaultTitle={process.env.WEBSITE_NAME}
				description={process.env.WEBSITE_DESCRIPTION}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: process.env.WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
		</>
	);
}

function	AppHeader(): ReactElement {
	const	[shouldDisplayPrice, set_shouldDisplayPrice] = React.useState(true);
	const	[tokenPrice, set_tokenPrice] = React.useState('0');
	const	{prices} = usePrices();
	const	{balancesOf} = useBalances();

	React.useEffect((): void => {
		set_tokenPrice(format.amount(Number(prices?.['yearn-finance']?.usd || 0), 2));
	}, [prices]);

	return (
		<Header>
			<div className={'justify-between pr-4 w-full flex-row-center'}>
				<h1>{process.env.WEBSITE_TITLE}</h1>
				<div className={'hidden flex-row items-center space-x-6 md:flex'}>
					<div
						className={'cursor-pointer'}
						onClick={(): void => set_shouldDisplayPrice(!shouldDisplayPrice)}>
						{shouldDisplayPrice ? (
							<p className={'text-typo-primary-variant'}>
								{`YFI $ ${tokenPrice}`}
							</p>
						) : (
							<p className={'text-typo-primary-variant'}>
								{`Balance: ${format.amount(Number(balancesOf?.[YFI_ADDRESS] || 0), 6)} YFI`}
							</p>
						)}
					</div>
				</div>
			</div>
		</Header>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;
	const	navbarMenuOptions = [
		{
			route: '/',
			values: ['/'],
			label: 'Home',
			icon: <Home  />
		},
		{
			route: '/doc/components',
			values: ['/doc/components'],
			label: 'Components',
			icon: <IconHealthcheck />
		},
		{
			route: '/doc/icons',
			values: ['/doc/icons'],
			label: 'Icons',
			icon: <AlertError />
		},
		{
			route: '/doc/layouts',
			values: ['/doc/layouts'],
			label: 'Layouts',
			icon: <Hamburger />,
			options: [
				{
					route: '/doc/layouts/header',
					values: ['/doc/layouts/header'],
					label: 'Header'
				}
			]
		}
	];

	function	onChangeRoute(selected: string): void {
		router.push(selected);
	}

	return (
		<>
			<AppHead />
			<div id={'app'} className={'grid flex-col grid-cols-12 gap-x-4 mx-auto mb-0 max-w-6xl md:flex-row'}>
				<div className={'sticky top-0 z-50 col-span-12 h-auto md:relative md:col-span-2'}>
					<div className={'flex flex-col justify-between h-full'}>
						<Navbar
							selected={router.pathname}
							set_selected={onChangeRoute}
							logo={<IconYearn className={'w-full h-12 text-primary'} />}
							title={'yWeb'}
							options={navbarMenuOptions}
							wrapper={<Link passHref href={''} />}>
							<div className={'flex flex-col mt-auto space-y-2'}>
								{
									process.env.USE_FEEDBACKS ? (
										<button data-feedbackfin-button className={'button-light'}>
											{'Feedback'}
										</button>
									) : null
								}
							</div>
						</Navbar>
					</div>
				</div>
				<div className={'flex flex-col col-span-12 px-4 w-full min-h-[100vh] md:col-span-10'}>
					<AppHeader />
					<Component
						key={router.route}
						router={props.router}
						{...pageProps} />
					<Footer />
				</div>
			</div>
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn>
			<AppWrapper
				Component={Component}
				pageProps={pageProps}
				router={props.router} />
		</WithYearn>
	);
}

export default MyApp;
