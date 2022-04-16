import	React, {ReactElement}			from	'react';
import	{Card, AlertBox, AlertTypes}	from	'@yearn/web-lib/components';
import	VariantSelectors				from	'components/documentation/VariantSelectors';
import	ComponentAPI					from	'components/documentation/ComponentAPI';
import	Highlight						from	'components/documentation/Highlight';

const code = `
import	React		from	'react';
import	{AlertBox}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<AlertBox
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
			<AlertBox
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
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'AlertBox'}</h1>
				<section aria-label={'code-part'}>
					<div className={'box-gradient-default'}>
						<div className={'w-3/4'}>
							<AlertBox
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
					</div>
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
