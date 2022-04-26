import	React, {ReactElement}			from	'react';
import	{Card, Banner, Button}	from	'@yearn/web-lib/components';
import	VariantSelectors				from	'components/documentation/VariantSelectors';
import	ComponentAPI					from	'components/documentation/ComponentAPI';
import	Highlight						from	'components/documentation/Highlight';

const code = `<Banner
key={\`someID-info\${refresher}\`}
id={'someID-info'}
title={'Welcome to banner'}
maxHeight={'max-h-[600px] md:max-h-[600px] banner--wrapper'}
primaryButton={<Button>Primary CTA</Button>}
secondaryButton={<Button variant='outlined'>Secondary CTA</Button>}
>
<div>
	<p>{\`This is a banner component. It can appear on different pages to inform users about anything. There can be multiple banners on a single page. Banners should be shown one by one. This component has controls. There is a cross mark in the top right corner to close one banner. There are arrows in the bottom right corner to switch between banners.\`}</p>
	<p>{\`Also the banner can have CTA as one or two buttons to provide some usefull links.\`}</p>
	<p>{\`The component’s height could be changed to fit text length. Please, be sure you have 24px gaps between outer borders and the whole content inside. And 16px between text and CTA buttons if there are some.\`}</p>
	<br />
	<p>{\`Have a nice day.\`}</p>
</div>
</Banner>`.trim();

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
					maxHeight={'max-h-[600px] md:max-h-[600px] banner--wrapper'}
					primaryButton={<Button>Primary CTA</Button>}
					secondaryButton={<Button variant='outlined'>Secondary CTA</Button>}
					>
					<div>
						<p>{`This is a banner component. It can appear on different pages to inform users about anything. There can be multiple banners on a single page. Banners should be shown one by one. This component has controls. There is a cross mark in the top right corner to close one banner. There are arrows in the bottom right corner to switch between banners.`}</p>
						<p>{`Also the banner can have CTA as one or two buttons to provide some usefull links.`}</p>
						<p>{`The component’s height could be changed to fit text length. Please, be sure you have 24px gaps between outer borders and the whole content inside. And 16px between text and CTA buttons if there are some.`}</p>
						<br />
						<p>{`Have a nice day.`}</p>
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
					maxHeight={'max-h-[600px] md:max-h-[600px] banner--wrapper'}
					primaryButton={<Button variant='light' className='bg-surface font-bold'>Primary CTA</Button>}
					secondaryButton={<Button variant='outlined' className='border-surface text-surface'>Secondary CTA</Button>}
					image={'https://s3-alpha-sig.figma.com/img/b829/4b75/53c36559b3a9d6b32c7dce0d538df530?Expires=1652054400&Signature=Yj4zLkEg3Du4T9nw8NVyqk-ytYa130MIlG79ZuFqYMyNLHW1wTI3OuQ~FTBbkzRRfNQmOOLSDz09j3YJH-RxUJv1ihvXxDn2Ln5tsJwGzWQl2ngxhcFNjhabyj3Dd8EQeB-qv6FMD1IhvnbgfbzVOv4i8sY4iQhpS00CJLebj~gr1enEmgUffFSeb0xrYbW5z~vGD7MJu2hMx9tjIu0bkOGrjzE4BribeVgi4ZOrs8bP9RNo7X4IjDC1Z8~dJ3mBBEIYgb2fuxJA54oybxWffzyhPVyTPMov6L1jaz6v6zZ5LIW~-JihfkfXCOp~zdYv4FV0ZFh8AQWf~gRNFZUqRQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}
					>
					<div>
						<p>{`This is a second image banner component. It has an image as a background with a slight black gradient on it to have a contrast with text. Use this type of banner if the image is not a primay content and could be just an accompagnement. Please be careful with the contrast. The text should be readable. The color of the text and controls can be changed according to image color to have a contrast. Also be sure that the image you use doesn’t have many details and is not very motley - again - to have a contrast.`}</p>
						<br />
						<p>{`Have a nice day.`}</p>
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
					maxHeight={'max-h-[600px] md:max-h-[600px] banner--wrapper'}
					primaryButton={<Button>Primary CTA</Button>}
					secondaryButton={<Button variant='outlined'>Secondary CTA</Button>}
					image={'https://s3-alpha-sig.figma.com/img/b829/4b75/53c36559b3a9d6b32c7dce0d538df530?Expires=1652054400&Signature=Yj4zLkEg3Du4T9nw8NVyqk-ytYa130MIlG79ZuFqYMyNLHW1wTI3OuQ~FTBbkzRRfNQmOOLSDz09j3YJH-RxUJv1ihvXxDn2Ln5tsJwGzWQl2ngxhcFNjhabyj3Dd8EQeB-qv6FMD1IhvnbgfbzVOv4i8sY4iQhpS00CJLebj~gr1enEmgUffFSeb0xrYbW5z~vGD7MJu2hMx9tjIu0bkOGrjzE4BribeVgi4ZOrs8bP9RNo7X4IjDC1Z8~dJ3mBBEIYgb2fuxJA54oybxWffzyhPVyTPMov6L1jaz6v6zZ5LIW~-JihfkfXCOp~zdYv4FV0ZFh8AQWf~gRNFZUqRQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}
					>
					<div>
						<p>{`This is a image banner component. It has an image on the right side that fills the half of the banner. The hight of the banner should adapt according to image and/or text hight.`}</p>
						<br />
						<p>{`Margin rules are the same as for regular banner`}</p>
						<br />
						<p>{`Have a nice day.`}</p>
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
					title={'Banner number TWO'}
					variant={'image'}
					maxHeight={'max-h-[600px] md:max-h-[600px] banner--wrapper'}
					image={'https://s3-alpha-sig.figma.com/img/51a1/2fe5/7e3ce66410a263a2c114465d9983e44c?Expires=1652054400&Signature=M75j71LEDL-7A95sBpXcuAXLZ~H06v0GyWZgZEfuA~-aX4Ouc3V6brvl-B0-WL5rU8-mDRGaIk2TnYx-FnZN-NYg5vMCT1FT~ehpUA~XN5emO~zPY~7N-AJbhIPxEX9OI137ysqsQs72~RuBPoNfyJRaGY92SFPBV~ity3xcI-~evMzP3h3UDUU~VctTGlbDIl7wSXOr~S1PTesgClzh-9nVBxyVrTB2eUW~-L6wK765CwfLJHjw8rWjKO8D336O9dJ0mU7vQShq2rr6tgS0EA~evYLMf-3JWl5cBKea6GGALcqebJIlGC6PxkSwQ27SVe0mtr8zZXX8~WwOpdRzvg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}
					>
					<div>
						<p>{`With only image with the`}</p>
						<p>{`optional text on itself`}</p>
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

type variants = 'default' | 'image' | 'split' | 'background';

function	VariantLevel(): ReactElement {
	const	[variant, set_variant] = React.useState(0);
	const	[refresher, set_refresher] = React.useState(0);
	const	variantType = ['default', 'image', 'split', 'background'];
	// const	resetStorage = (): void => {
	// 	window.localStorage.setItem(`someID-${variantType[variant] as variants}`, JSON.stringify(true));
	// 	setTimeout((): void => set_refresher(refresher + 1), 100);
	// };

	function	renderBanner(): ReactElement {
		if (variantType[variant] === 'default') {
			return (
				<BannerComponentDefault/>
			);
		}
		if (variantType[variant] === 'split') {
			return (
				<BannerComponentSplit/>
			);
		}
		if (variantType[variant] === 'image') {
			return (
				<BannerComponentImage/>
			);
		}
		if (variantType[variant] === 'background') {
			return (
				<BannerComponentBackground/>
			);
		}
		return (
			<BannerComponentDefault/>
		);
	}

	return (
		<div className={'box-gradient-default'}>
			<div className={'w-5/6'}>
				{renderBanner()}
			</div>
			<VariantSelectors
				selected={variantType[variant]}
				variants={variantType}
				onChange={(n: number): void => set_variant(n)} />
			{/* <div className={'absolute right-4 bottom-4'}>
				<div onClick={resetStorage} className={'flex px-2 h-8 font-bold rounded-lg transition-colors cursor-pointer bg-surface flex-center hover:bg-surface-variant'}>{'Reset'}</div>
			</div> */}
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
					<p className={'mb-2'}>{'The Alert Banner component is used to display some notice. A few levels are available, info, warning, error and critical and multiple pages could be used.'}</p>
					<p className={'mb-4'}>{'Note: the component uses the localStorage to save the user choice, aka once dismissed, the alert with the provided id will no longer be displayed.'}</p>

					<ComponentAPI
						elements={[{
							title: 'id',
							type: 'string',
							description: 'Unique string to identify the banner in the local storage'
						},
						{
							title: 'variant',
							type: 'default | image | split | background',
							description: 'Indicate the type of banner to display'
						},
						{
							title: 'title?',
							type: 'string',
							description: 'Title displayed on the top of the banner. Not used with image variant'
						},
						{
							title: 'image?',
							type: 'string',
							description: 'Image URL displayed at banner. Not used with default variant'
						},
						{
							title: 'children?',
							type: 'string',
							description: 'Text displayed. Not used with image variant.'
						},
						{
							title: 'primaryButton?',
							type: 'ReactElement',
							description: 'Button to display as primary action. Not used with image variant.'
						},
						{
							title: 'secondaryButton?',
							type: 'ReactElement',
							description: 'Button to display as secondary action. Not used with image variant.'
						},
						{
							title: 'onClick?',
							type: 'string',
							description: 'Action to trigger when clicked and using the image variant.'
						},
						{
							title: 'maxHeight?',
							type: 'string',
							description: 'Special variable to use as className. In pure CSS, it is impossible to correctly animate height, we need to animate max-height. This allow us to customize the max-height and have a correct transition on banner close.'
						},
						{
							title: 'canClose?',
							type: 'boolean',
							description: 'Can the banner be closed? Default is set to true. If false, the banner will always render and the cross will be hidden.'
						},
						{
							title: 'onClose?',
							type: 'function',
							description: 'Action to perform onClose. By default, this is handled by the component itself.'
						},
						{
							title: 'children',
							type: 'ReactElement | ReactElement[]',
							description: 'Worth a mention: can be a single ReactElement or an array of ReactElement. If it is an array, this will enable the multi-page banner.'
						}]} />
				</section>
			</Card>
		</section>
	);
}

export default DocumentationBanner;