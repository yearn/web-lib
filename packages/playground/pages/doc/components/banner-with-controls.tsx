import React, {useState} from 'react';
import CodeExample from 'components/CodeExample';
import ComponentAPI from 'components/documentation/ComponentAPI';
import Highlight from 'components/documentation/Highlight';
import {Banner} from '@yearn-finance/web-lib/components/Banner';
import {Button} from '@yearn-finance/web-lib/components/Button';
import {Card} from '@yearn-finance/web-lib/components/Card';

import type {ReactElement} from 'react';

const code = `
<Banner.WithControls>
	<Banner title={'Welcome to banner'}>
		<div>{'Have a nice day.'}</div>
	</Banner>
	<Banner title={'A nice day'}>
		<div>{'You too.'}</div>
	</Banner>
</Banner.WithControls>
`.trim();

export function	BannerWithControlsComponent(): ReactElement {
	return (
		<div className={'w-full'}>
			<Banner.WithControls>
				<Banner title={'Welcome to banner'}>
					<div>{'Have a nice day.'}</div>
				</Banner>
				<Banner title={'A nice day'}>
					<div>{'You too.'}</div>
				</Banner>
			</Banner.WithControls>
		</div>
	);
}

function	BannerComponentDefault(props: any): ReactElement {
	return (
		<Banner
			{...props}
			title={'Welcome to banner'}
			primaryButton={<Button>{'Primary CTA'}</Button>}
			secondaryButton={<Button variant={'light'}>{'Secondary CTA'}</Button>}>
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

function	VariantLevel(): ReactElement {
	const	[isClosed, set_isClosed] = useState(false);

	function	renderBanner(): ReactElement {
		return (
			<div className={'flex-center relative w-full'}>
				<div className={'z-10'}>
					{!isClosed ? (
						<Banner.WithControls onClose={(): void => set_isClosed(true)}>
							<BannerComponentDefault />
							<BannerComponentDefault />
							<BannerComponentDefault />
							<BannerComponentDefault />
						</Banner.WithControls>
					): null}
				</div>
				<div className={'absolute z-0'}>
					<div onClick={(): void => set_isClosed(false)} className={'rounded-default flex-center bg-neutral-0 flex h-8 cursor-pointer px-2 font-bold transition-colors hover:bg-neutral-100'}>{'Reset'}</div>
				</div>
			</div>
		);
	}

	return (
		<CodeExample>
			<div className={'w-full scale-100 md:scale-90'}>
				{renderBanner()}
			</div>
		</CodeExample>
	);
}

function	DocumentationBanner(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'Banner With Controls'}</h1>
				<section aria-label={'code-part'}>
					<VariantLevel />
					<Highlight code={code} />
				</section>

				<section aria-label={'description-part'} className={'mt-6'}>
					<h4 className={'mb-1'}>{'Description'}</h4>
					<p className={'mb-2'}>{'The Banner.WithControls component allows you to scroll many banners in the same space, and to close the component.'}</p>

					<ComponentAPI
						elements={[
							{
								title: 'children',
								type: 'ReactElement | ReactElement[]',
								description: 'Add one or more banners as children. Pagination is automatically added.'
							},
							{
								title: 'paginationStyle',
								type: 'string',
								description: 'Styling classes to apply to pagination elements'
							},
							{
								title: 'onClose',
								type: 'function',
								description: 'Function called when banner is closed'
							}
						]} />
				</section>
			</Card>
		</section>
	);
}

export default DocumentationBanner;
