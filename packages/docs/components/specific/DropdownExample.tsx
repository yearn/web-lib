import React, {useState} from 'react';
import {CodeExample} from 'components/CodeExample';
import {Dropdown} from '@yearn-finance/web-lib/components/Dropdown';
import IconNetworkArbitrum from '@yearn-finance/web-lib/icons/IconNetworkArbitrum';
import IconNetworkEthereum from '@yearn-finance/web-lib/icons/IconNetworkEthereum';
import IconNetworkFantom from '@yearn-finance/web-lib/icons/IconNetworkFantom';
import IconNetworkOptimism from '@yearn-finance/web-lib/icons/IconNetworkOptimism';

function DropdownExample(): React.ReactElement {
	const	options = [
		{icon: <IconNetworkEthereum />, label: 'Ethereum', value: 1},
		{icon: <IconNetworkOptimism />, label: 'Optimism', value: 10},
		{icon: <IconNetworkFantom />, label: 'Fantom', value: 250},
		{icon: <IconNetworkArbitrum />, label: 'Arbitrum', value: 42161},
		{label: 'No Icon', value: 123}
	];
	const	[selectedOption, set_selectedOption] = useState(options[0]);

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