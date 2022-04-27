import	React, {ReactElement}			from	'react';
import	{Card, Banner, Button}	from	'@yearn/web-lib/components';
import	VariantSelectors				from	'components/documentation/VariantSelectors';
import	ComponentAPI					from	'components/documentation/ComponentAPI';
import	Highlight						from	'components/documentation/Highlight';

const code = ``.trim();

export function	BannerComponentDefault(): ReactElement {
	const	[refresher, set_refresher] = React.useState(0);
	const	resetStorage = (): void => {
		window.localStorage.setItem('someID-info', JSON.stringify(true));
		setTimeout((): void => set_refresher(refresher + 1), 100);
	};
	return (
		<div className={'relative w-full flex-center'}>
			<div className={'z-10'}>
				<Banner
					key={`someID-info${refresher}`}
					id={'someID-info'}
					title={'Welcome to banner'}
					primaryButton={<Button>{'Primary CTA'}</Button>}
					secondaryButton={<Button variant={'outlined'}>{'Secondary CTA'}</Button>}>
					<div>
						<p>{'This is a banner component. It can appear on different pages to inform users about anything. There can be multiple banners on a single page. Banners should be shown one by one. This component has controls. There is a cross mark in the top right corner to close one banner. There are arrows in the bottom right corner to switch between banners.'}</p>
						<p>{'Also the banner can have CTA as one or two buttons to provide some usefull links.'}</p>
						<p>{'The component’s height could be changed to fit text length. Please, be sure you have 24px gaps between outer borders and the whole content inside. And 16px between text and CTA buttons if there are some.'}</p>
						<br />
						<p>{'Have a nice day.'}</p>
					</div>
				</Banner>
			</div>
			{/* below is the reset button to reopen the banner after closing it*/}
			<div className={'absolute z-0'}>
				<div onClick={resetStorage} className={'flex px-2 h-8 font-bold rounded-lg transition-colors cursor-pointer bg-surface flex-center hover:bg-surface-variant'}>{'Reset'}</div>
			</div>
		</div>
	);
}

export function	BannerComponentBackground(): ReactElement {
	const	[refresher, set_refresher] = React.useState(0);
	const	resetStorage = (): void => {
		window.localStorage.setItem('someID-info', JSON.stringify(true));
		setTimeout((): void => set_refresher(refresher + 1), 100);
	};
	return (
		<div className={'relative w-full flex-center'}>
			<div className={'z-10'}>
				<Banner
					key={`someID-info${refresher}`}
					id={'someID-info'}
					title={'Welcome to banner 4'}
					variant={'background'}
					primaryButton={<Button variant={'light'} className={'font-bold bg-surface'}>{'Primary CTA'}</Button>}
					secondaryButton={<Button variant={'outlined'} className={'border-surface text-surface'}>{'Secondary CTA'}</Button>}
					image={'https://s3-alpha-sig.figma.com/img/b829/4b75/53c36559b3a9d6b32c7dce0d538df530?Expires=1652054400&Signature=Yj4zLkEg3Du4T9nw8NVyqk-ytYa130MIlG79ZuFqYMyNLHW1wTI3OuQ~FTBbkzRRfNQmOOLSDz09j3YJH-RxUJv1ihvXxDn2Ln5tsJwGzWQl2ngxhcFNjhabyj3Dd8EQeB-qv6FMD1IhvnbgfbzVOv4i8sY4iQhpS00CJLebj~gr1enEmgUffFSeb0xrYbW5z~vGD7MJu2hMx9tjIu0bkOGrjzE4BribeVgi4ZOrs8bP9RNo7X4IjDC1Z8~dJ3mBBEIYgb2fuxJA54oybxWffzyhPVyTPMov6L1jaz6v6zZ5LIW~-JihfkfXCOp~zdYv4FV0ZFh8AQWf~gRNFZUqRQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}
				>
					<div>
						<p>{'This is a second image banner component. It has an image as a background with a slight black gradient on it to have a contrast with text. Use this type of banner if the image is not a primay content and could be just an accompagnement. Please be careful with the contrast. The text should be readable. The color of the text and controls can be changed according to image color to have a contrast. Also be sure that the image you use doesn’t have many details and is not very motley - again - to have a contrast.'}</p>
						<br />
						<p>{'Have a nice day.'}</p>
					</div>
				</Banner>
			</div>
			{/* below is the reset button to reopen the banner after closing it*/}
			<div className={'absolute z-0'}>
				<div onClick={resetStorage} className={'flex px-2 h-8 font-bold rounded-lg transition-colors cursor-pointer bg-surface flex-center hover:bg-surface-variant'}>{'Reset'}</div>
			</div>
		</div>
	);
}

export function	BannerComponentSplit(): ReactElement {
	const	[refresher, set_refresher] = React.useState(0);
	const	resetStorage = (): void => {
		window.localStorage.setItem('someID-info', JSON.stringify(true));
		setTimeout((): void => set_refresher(refresher + 1), 100);
	};
	return (
		<div className={'relative w-full flex-center'}>
			<div className={'z-10'}>
				<Banner
					key={`someID-info${refresher}`}
					id={'someID-info'}
					title={'Welcome to banner 3'}
					variant={'split'}
					primaryButton={<Button>{'Primary CTA'}</Button>}
					secondaryButton={<Button variant={'outlined'}>{'Secondary CTA'}</Button>}
					image={'https://s3-alpha-sig.figma.com/img/b829/4b75/53c36559b3a9d6b32c7dce0d538df530?Expires=1652054400&Signature=Yj4zLkEg3Du4T9nw8NVyqk-ytYa130MIlG79ZuFqYMyNLHW1wTI3OuQ~FTBbkzRRfNQmOOLSDz09j3YJH-RxUJv1ihvXxDn2Ln5tsJwGzWQl2ngxhcFNjhabyj3Dd8EQeB-qv6FMD1IhvnbgfbzVOv4i8sY4iQhpS00CJLebj~gr1enEmgUffFSeb0xrYbW5z~vGD7MJu2hMx9tjIu0bkOGrjzE4BribeVgi4ZOrs8bP9RNo7X4IjDC1Z8~dJ3mBBEIYgb2fuxJA54oybxWffzyhPVyTPMov6L1jaz6v6zZ5LIW~-JihfkfXCOp~zdYv4FV0ZFh8AQWf~gRNFZUqRQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}
				>
					<div>
						<p>{'This is a image banner component. It has an image on the right side that fills the half of the banner. The hight of the banner should adapt according to image and/or text hight.'}</p>
						<br />
						<p>{'Margin rules are the same as for regular banner'}</p>
						<br />
						<p>{'Have a nice day.'}</p>
					</div>
				</Banner>
			</div>
			{/* below is the reset button to reopen the banner after closing it*/}
			<div className={'absolute z-0'}>
				<div onClick={resetStorage} className={'flex px-2 h-8 font-bold rounded-lg transition-colors cursor-pointer bg-surface flex-center hover:bg-surface-variant'}>{'Reset'}</div>
			</div>
		</div>
	);
}

export function	BannerComponentImage(): ReactElement {
	const	[refresher, set_refresher] = React.useState(0);
	const	resetStorage = (): void => {
		window.localStorage.setItem('someID-info', JSON.stringify(true));
		setTimeout((): void => set_refresher(refresher + 1), 100);
	};
	return (
		<div className={'relative w-full flex-center'}>
			<div className={'z-10'}>
				<Banner
					key={`someID-info${refresher}`}
					id={'someID-info'}
					variant={'image'}
					image={'/goblin-town.jpg'}
					onClick={console.log}
					/>
			</div>
			{/* below is the reset button to reopen the banner after closing it*/}
			<div className={'absolute z-0'}>
				<div onClick={resetStorage} className={'flex px-2 h-8 font-bold rounded-lg transition-colors cursor-pointer bg-surface flex-center hover:bg-surface-variant'}>{'Reset'}</div>
			</div>
		</div>
	);
}

type TVariants = 'default' | 'image' | 'split' | 'background';

function	VariantLevel(): ReactElement {


	function	renderBanner(): ReactElement {
		return (<BannerPagination>
			<BannerComponentDefault />
			<BannerComponentImage />
			<BannerComponentSplit />
			<BannerComponentBackground />
		</BannerPagination>);
	}

	return (
		<div className={'box-gradient-default'}>
			<div className={'w-full scale-90'}>
				{renderBanner()}
			</div>
		</div>
	);
}

function	DocumentationBanner(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'Banner'}</h1>
				<section aria-label={'code-part'}>
					<VariantLevel />
					<Highlight code={code} />
				</section>

				<section aria-label={'description-part'} className={'mt-6'}>
					<h4 className={'mb-1'}>{'Description'}</h4>
					<p className={'mb-2'}>{'The BannerPagination component allows you to scroll many banners in the same space.'}</p>

					<ComponentAPI
						elements={[{
							title: 'children',
							type: 'ReactElement | ReactElement[]',
							description: 'Add one or more banners as children. Pagination is automatically added.',
						}]} />
				</section>
			</Card>
		</section>
	);
}

export default DocumentationBanner;