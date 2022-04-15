import	React, {ReactElement}		from	'react';
import	{Card}						from	'@yearn/web-lib/components';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';

const code = `
import	React	from	'react';
import	{Card}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Card>
			<p>{'I am a basic card.'}</p>
		</Card>
	);
}`.trim();

export function	CardComponent(): ReactElement {
	return (
		<div className={'w-3/4'}>
			<Card>
				<p>{'I am a basic card.'}</p>
			</Card>
		</div>
	);
}

function	DocumentationCard(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'Card'}</h1>				
				<div className={'box-gradient-default'}>
					<CardComponent />
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The Card is one of the main wrapper for the UI components, displayed on a surface. It is used to represent a section or a group of related items over the background.'}</p>
				<p className={'mb-4'}>{'The Card is a default component, and a few subcomponents are available, using the base logic, in order to build more complexe stuffs.'}</p>

				<ComponentAPI
					elements={[{
						title: 'variant?',
						type: 'surface | background',
						description: 'Used to indicate if the Card is displayed on the Background (use surface) or on a Surface (use background). Default set to surface.'
					},
					{
						title: 'padding?',
						type: 'none | narrow',
						description: 'Indicate is the card should use no padding (0px), narrow padding (8px) or regular (16px). Default set to regular.'
					},
					{
						title: 'onClick?',
						type: 'React.MouseEventHandler',
						description: 'If onClick is set, this will enable the hover variant for the card. This does not overwrite the onClick function. Default to undefined.'
					},
					{
						title: 'className',
						type: 'string',
						description: 'Custom className to provide to alter the style of the Card.'
					}]} />
			</Card>
		</section>
	);
}

export default DocumentationCard;
