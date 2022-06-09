import	React, {ReactElement}		from	'react';
import	{Card, Dropdown}			from	'@yearn/web-lib/components';
import	* as Icons					from	'@yearn/web-lib/icons';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';
import	CodeExample					from	'components/CodeExample';

const code = `
import	React		from	'react';
import	{Dropdown}	from	'@yearn/web-lib/components';
import	* as Icons	from	'@yearn/web-lib/icons';

export default function	App(): React.ReactElement {
	const	options = [
		{icon: <Icons.NetworkEthereum />, label: 'Ethereum', value: 1},
		{icon: <Icons.NetworkFantom />, label: 'Fantom', value: 250},
		{icon: <Icons.NetworkArbitrum />, label: 'Arbitrum', value: 42161},
		{label: 'No Icon', value: 123}
	];
	const	[selectedOption, set_selectedOption] = React.useState(options[0]);

	return (
		<Dropdown
			defaultOption={options[0]}
			options={options}
			selected={selectedOption}
			onSelect={(option: any): void => set_selectedOption(option)} />
	);
}`.trim();

export function	DropdownComponent(): ReactElement {
	const	options = [
		{icon: <Icons.NetworkEthereum />, label: 'Ethereum', value: 1},
		{icon: <Icons.NetworkFantom />, label: 'Fantom', value: 250},
		{icon: <Icons.NetworkArbitrum />, label: 'Arbitrum', value: 42161},
		{label: 'No Icon', value: 123}
	];
	const	[selectedOption, set_selectedOption] = React.useState(options[0]);

	return (
		<Dropdown
			defaultOption={options[0]}
			options={options}
			selected={selectedOption}
			onSelect={(option: any): void => set_selectedOption(option)} />
	);
}

function	DocumentationDropdown(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'Dropdown'}</h1>
				<CodeExample>
					<DropdownComponent />
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The Dropdown component is used to create what is known as <select> in regular HTML. It is a list of possible options you could select. This should be used to allow an user to choose between multiple options, like the network selection for example.'}</p>
				<p className={'mb-4'}>{'The component has headless states, meaning you have to send him the useState and you can controle the callback.'}</p>

				<ComponentAPI
					elements={[{
						title: 'options',
						type: '[{\n\ticon?: ReactElement,\n\tvalue: string | number,\n\tlabel: string\n}]',
						description: 'List of available options to select. The icon field is optional and the label field will be the one displayed. Values should be unique accross the dropdown.'
					},
					{
						title: 'defaultOption',
						type: 'one of options',
						description: 'Should be one of the options item. This is the default selected option, displayed when the dropdown is rendered the first time.'
					},
					{
						title: 'selected',
						type: 'one of options',
						description: 'The currently selected option. This should change once the user selects a new option in the dropdown. Best controled by a react.useState.'
					},
					{
						title: 'onSelect',
						type: 'function',
						description: 'Callback when a new option is selected. The function will have the new selected option object as first param. You can then choose how to update the selected variable.'
					}]} />

			</Card>
		</section>
	);
}

export default DocumentationDropdown;
