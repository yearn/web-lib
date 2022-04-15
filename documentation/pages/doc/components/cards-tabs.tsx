import	React, {ReactElement}		from	'react';
import	{Card}						from	'@yearn/web-lib/components';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';

const code = `
import	React	from	'react';
import	{Card}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Card.Tabs
			tabs={[
				{label: 'Details', children: <b>{'I am the first card.'}</b>},
				{label: 'Reports', children: <p>{'I am the second Tab'}</p>},
				{label: 'Health Check', children: <p>{'And a third one?'}</p>}
			]}
		/>
	);
}`.trim();

export function	CardTabsComponent(): ReactElement {
	return (
		<div className={'w-3/4'}>
			<Card.Tabs
				tabs={[
					{label: 'Details', children: <b>{'I am the first card.'}</b>},
					{label: 'Reports', children: <p>{'I am the second Tab'}</p>},
					{label: 'Check', children: <p>{'And a third one?'}</p>}
				]}
			/>
		</div>
	);
}

function	DocumentationCard(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'Card.Tabs'}</h1>
				<div className={'box-gradient-default'}>
					<CardTabsComponent />
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-4'}>{'The Card.Tabs is a variant of Card that will display the Card with some available Tabs.'}</p>

				<ComponentAPI
					elements={[{
						title: 'tabs',
						type: '[{\n\tlabel: string,\n\tchildren: ReactElement\n}]',
						description: 'Array of object containing a label, aka the title of the tab, and a children for each tab. You can have as many tab as you want, until the UI breaks (recommanded with 2/3 tabs max)'
					}]} />

			</Card>
		</section>
	);
}

export default DocumentationCard;
