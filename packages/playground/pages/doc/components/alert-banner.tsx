import	React, {useState}			from	'react';
import	CodeExample						from	'components/CodeExample';
import	ComponentAPI					from	'components/documentation/ComponentAPI';
import	Highlight						from	'components/documentation/Highlight';
import	VariantSelectors				from	'components/documentation/VariantSelectors';
import	{Alert, Card}				from	'@yearn-finance/web-lib/components';

import type {ReactElement} from 'react';
import type {TAlertLevels}				from	'@yearn-finance/web-lib/components/Alert';

const code = `
import	React			from	'react';
import	{Alert}	from	'@yearn-finance/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Alert.Banner
			title={'Spend your time wisely'}
			maxHeight={'max-h-[600px] md:max-h-[300px]'}>
			<div>
				<p>{'Yearn Vaults are a way to use technology to help manage your holdings. You choose the strategy that best suits you, deposit into that vault, and Yearn tech helps maximize yield through shifting capital, auto-compounding, and rebalancing.'}</p>
				<p className={'block mt-4'}>{'Custody, and responsibility, for your holdings remains yours.'}</p>
				<p className={'block mt-4'}>{'You can withdraw anytime.'}</p>
			</div>
		</Alert.Banner>
	);
}`.trim();

export function	AlertBannerComponent(): ReactElement {
	return (
		<div className={'flex-center relative w-full'}>
			<div className={'z-10'}>
				<Alert.Banner
					title={'Spend your time wisely'}
					maxHeight={'max-h-[600px] md:max-h-[300px] alertBanner--wrapper'}>
					<div>
						<p>{'Yearn Vaults are a way to use technology to help manage your holdings.'}</p>
					</div>
				</Alert.Banner>
			</div>
		</div>
	);
}

function	VariantLevel(): ReactElement {
	const	[variant, set_variant] = useState(0);
	const	variantType = ['info', 'warning', 'error', 'critical', 'multi'];

	function	renderAlertBanner(): ReactElement {
		if (variant === 4) {
			return (
				<Alert.Banner
					title={'Spend your time wisely (multi)'}
					maxHeight={'max-h-[600px] md:max-h-[300px] alertBanner--wrapper'}>
					<div>
						<p>{'Yearn Vaults are a way to use technology to help manage your holdings. You choose the strategy that best suits you, deposit into that vault, and Yearn tech helps maximize yield through shifting capital, auto-compounding, and rebalancing.'}</p>
						<p className={'mt-4 block'}>{'Custody, and responsibility, for your holdings remains yours.'}</p>
						<p className={'mt-4 block'}>{'You can withdraw anytime.'}</p>
					</div>
					<div>
						<p>{'And we may have a lot of pages!'}</p>
						<p className={'mt-4 block'}>{'Quia et autem officiis. Nemo ut commodi accusamus qui. Quo sit eum amet aut dolore. Quo consectetur enim voluptatem repudiandae provident et.'}</p>
						<p className={'mt-4 block'}>{'Ut est velit dolor ut. Laudantium cum et enim consequatur rem. Architecto sed ducimus dolores et in neque et.'}</p>
					</div>
					<div>
						<p>{'Exercitationem ab sed dolor dolorum omnis. Qui laudantium voluptatem possimus excepturi aliquid vel necessitatibus et. Iste similique illum cumque mollitia aut voluptatibus quia nam. Nemo atque vel vero est. Perspiciatis officiis veritatis animi libero.'}</p>
						<p className={'mt-4 block'}>{'Quis repellendus est pariatur est eos et autem qui. '}</p>
					</div>
				</Alert.Banner>
			);
		}
		return (
			<Alert.Banner
				title={`Spend your time wisely (${variantType[variant]})`}
				level={variantType[variant] as TAlertLevels}
				maxHeight={'max-h-[600px] md:max-h-[300px] alertBanner--wrapper'}>
				<div>
					<p>{'Yearn Vaults are a way to use technology to help manage your holdings. You choose the strategy that best suits you, deposit into that vault, and Yearn tech helps maximize yield through shifting capital, auto-compounding, and rebalancing.'}</p>
					<p className={'mt-4 block'}>{'Custody, and responsibility, for your holdings remains yours.'}</p>
					<p className={'mt-4 block'}>{'You can withdraw anytime.'}</p>
				</div>
			</Alert.Banner>
		);
	}

	return (
		<CodeExample>
			<div className={'w-3/4 scale-75'}>
				{renderAlertBanner()}
			</div>
			<VariantSelectors
				selected={variantType[variant]}
				variants={variantType}
				onChange={(n: number): void => set_variant(n)} />
		</CodeExample>
	);
}

function	DocumentationAlertBanner(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'AlertBanner'}</h1>
				<section aria-label={'code-part'}>
					<VariantLevel />
					<Highlight code={code} />
				</section>

				<section aria-label={'description-part'} className={'mt-6'}>
					<h4 className={'mb-1'}>{'Description'}</h4>
					<p className={'mb-2'}>{'The Alert Banner component is used to display some notice. A few levels are available, info, warning, error and critical and multiple pages could be used.'}</p>

					<ComponentAPI
						elements={[
							{
								title: 'level',
								type: 'info | warning | error | critical',
								description: 'Indicate the type of banner to display, aka mostly the colors. Default is set to info'
							},
							{
								title: 'title',
								type: 'string',
								description: 'Title to use for this banner. The title is a h4 title.'
							},
							{
								title: 'maxHeight?',
								type: 'string',
								description: 'Special variable to use as className. In pure CSS, it is impossible to correctly animate height, we need to animate max-height. This allow us to customize the max-height and have a correct transition on banner close.'
							},
							{
								title: 'canClose?',
								type: 'boolean',
								description: 'Can the banner be closed? Default is set to true. If false, the banner will alwasy render and the cross will be hidden.'
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
							}
						]} />
				</section>
			</Card>
		</section>
	);
}

export default DocumentationAlertBanner;
