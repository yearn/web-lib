import	React, {ReactElement}			from	'react';
import	{Card, Banner, Button}			from	'@majorfi/web-lib/components';
import	ComponentAPI					from	'components/documentation/ComponentAPI';
import	Highlight						from	'components/documentation/Highlight';
import	CodeExample						from	'components/CodeExample';

const code = `<Banner
	title={'Welcome to banner'}
	primaryButton={<Button>Primary CTA</Button>}
	secondaryButton={<Button variant='outlined'>Secondary CTA</Button>}>
	<div>
		<p>{\`This is a banner component. It can appear on different pages to inform users about anything. There can be multiple banners on a single page. Banners should be shown one by one. This component has controls. There is a cross mark in the top right corner to close one banner. There are arrows in the bottom right corner to switch between banners.\`}</p>
		<p>{\`Also the banner can have CTA as one or two buttons to provide some usefull links.\`}</p>
		<p>{\`The component’s height could be changed to fit text length. Please, be sure you have 24px gaps between outer borders and the whole content inside. And 16px between text and CTA buttons if there are some.\`}</p>
		<br />
		<p>{\`Have a nice day.\`}</p>
	</div>
</Banner>`.trim();

export function BannerComponent(): ReactElement {
	return (
		<div className={'w-full scale-75'}>
			<Banner
				title={'Welcome to banner 3'}
				primaryButton={<Button>{'Primary CTA'}</Button>}>
				<div>
					<p>{'Have a nice day.'}</p>
				</div>
			</Banner>
		</div>
	);
}

function	BannerComponentDefault(): ReactElement {
	return (
		<Banner
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
	);
}

function	DocumentationBanner(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'Banner'}</h1>
				<section aria-label={'code-part'}>
					<CodeExample>
						<div className={'w-full scale-90'}>
							<BannerComponentDefault />
						</div>
					</CodeExample>
					<Highlight code={code} />
				</section>

				<section aria-label={'description-part'} className={'mt-6'}>
					<h4 className={'mb-1'}>{'Description'}</h4>
					<p className={'mb-2'}>{'The Banner component is used to display some notice. There are 4 variations with image options.'}</p>
					<p className={'mb-4'}>{'Note: the component uses the localStorage to save the user choice, aka once dismissed, the banner with the provided id will no longer be displayed.'}</p>

					<ComponentAPI
						elements={[{
							title: 'title',
							type: 'string',
							description: 'Title displayed on the top of the banner. Not used with image variant'
						},
						{
							title: 'children',
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