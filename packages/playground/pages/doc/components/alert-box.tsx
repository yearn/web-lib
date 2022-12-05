import	React, {ReactElement}			from	'react';
import	{Card, Alert}				from	'@yearn-finance/web-lib/components';
import	VariantSelectors				from	'components/documentation/VariantSelectors';
import	ComponentAPI					from	'components/documentation/ComponentAPI';
import	Highlight						from	'components/documentation/Highlight';
import	CodeExample						from	'components/CodeExample';
import type * as AlertTypes				from	'@yearn-finance/web-lib/components/Alert';

const code = `
import	React		from	'react';
import	{Alert}	from	'@yearn-finance/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Alert.Box
			level={'warning'}
			alerts={[
				'This is my alert number 1',
				'And this is the second one',
				'Yes, I am bad at writing dummy texts'
			]} />
	);
}`.trim();


export function	AlertBoxComponent(): ReactElement {
	return (
		<div className={'w-3/4'}>
			<Alert.Box
				level={'warning'}
				alerts={[
					'This is my alert number 1',
					'And this is the second one',
					'Yes, I am bad at writing dummy texts'
				]} />
		</div>
	);
}

function	DocumentationAlertBox(): ReactElement {
	const	[variant, set_variant] = React.useState(0);
	const	variantType = ['info', 'warning', 'error', 'critical'];

	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'AlertBox'}</h1>
				<section aria-label={'code-part'}>
					<CodeExample>
						<div className={'w-3/4'}>
							<Alert.Box
								level={variantType[variant] as AlertTypes.TAlertLevels}
								alerts={[
									'This is my alert number 1',
									'And this is the second one',
									'Yes, I am bad at writing dummy texts'
								]} />
						</div>
						<VariantSelectors
							selected={variantType[variant]}
							variants={variantType}
							onChange={(n: number): void => set_variant(n)} />
					</CodeExample>
					<Highlight code={code} />
				</section>

				<section aria-label={'description-part'} className={'mt-6'}>
					<h4 className={'mb-1'}>{'Description'}</h4>
					<p className={'mb-4'}>{'The Alert Box component is used to display a group of alerts with the icon matching the alert level aside. This should be used to display, for example, a list of warnings related to a specific situation. See usage on Yearn Watch.'}</p>

					<ComponentAPI
						elements={[{
							title: 'level',
							type: 'info | warning | error | critical',
							description: 'Indicate the type of banner to display, aka mostly the colors. Default is set to info'
						},
						{
							title: 'alerts',
							type: 'string[]',
							description: 'List of message to display.'
						}]} />
				</section>
			</Card>
		</section>
	);
}

export default DocumentationAlertBox;
