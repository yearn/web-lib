import	React, {ReactElement}		from	'react';
import	{Card, SearchBox}			from	'@yearn/web-lib/components';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';

const code = `
import	React			from	'react';
import	{SearchBox}		from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<SearchBox
			ariaLabel={'My Custom SearchBox'}
			onSearch={(s: string): void => alert(\`Searching for \${s}\`)}
			searchTerm={searchTerm}
			onChange={set_searchTerm} />
	);
}`.trim();

export function	SearchBoxComponent(): ReactElement {
	const	[searchTerm, set_searchTerm] = React.useState('');
	return (
		<div className={'w-3/4'}>
			<SearchBox
				ariaLabel={'My Custom SearchBox'}
				searchTerm={searchTerm}
				onSearch={(s: string): void => alert(`Searching for ${s}`)}
				onChange={set_searchTerm} />
		</div>
	);
}

function	DocumentationStatCard(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'SearchBox'}</h1>				
				<div className={'box-gradient-default'}>
					<SearchBoxComponent />
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The SearchBox is an <input> wrapped in a Card with no padding. It should be used to search an element.'}</p>
				<p className={'mb-4'}>{'The component has headless states, meaning you have to send him the useState and you can controle the callback.'}</p>
				<ComponentAPI
					elements={[{
						title: 'searchTerm',
						type: 'string',
						description: 'The current value typed in the SearchBox. When the user type, this value should be updated with the onChange prop.'
					},
					{
						title: 'onChange',
						type: '(s: string) => void',
						description: 'Callback when the value of the SearchBox is updated. The string send as param is directly the typed value.'
					},
					{
						title: 'onSearch?',
						type: '(s: string) => void',
						description: 'Callback when the form is submitted, trigger to perform the search.'
					},
					{
						title: 'isNarrow?',
						type: 'boolean',
						description: 'Indicate if the SearchBox should be narrow or not. A narrow box has less padding and a smaller height.'
					},
					{
						title: 'ariaLabel?',
						type: 'string',
						description: 'The ariaLabel attribute defines a string value that labels the interactive element. It\'s best to have because the search has no accessible name, does not accurately describe its contents, and there is no content visible in the DOM that can be associated with the object to give it meaning. Only used for accessibility. Should be a name to indicate the search. Default is set to "Search"'
					}]} />
			</Card>
		</section>
	);
}

export default DocumentationStatCard;
