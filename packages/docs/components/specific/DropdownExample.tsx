import	React		    from 'react';
import {CodeExample}    from 'components/CodeExample';
import {Dropdown}       from '@yearn-finance/web-lib/components';
import	* as Icons	    from '@yearn-finance/web-lib/icons';

function	DropdownExample(): React.ReactElement {
	const	options = [
		{icon: <Icons.NetworkEthereum />, label: 'Ethereum', value: 1},
		{icon: <Icons.NetworkOptimism />, label: 'Optimism', value: 10},
		{icon: <Icons.NetworkFantom />, label: 'Fantom', value: 250},
		{icon: <Icons.NetworkArbitrum />, label: 'Arbitrum', value: 42161},
		{label: 'No Icon', value: 123}
	];
	const	[selectedOption, set_selectedOption] = React.useState(options[0]);

	return (
		<CodeExample>
			<Dropdown
				defaultOption={options[0]}
				options={options}
				selected={selectedOption}
				onSelect={(option: any): void => set_selectedOption(option)} />
		</CodeExample>
	);
}

export {DropdownExample};
export default DropdownExample;