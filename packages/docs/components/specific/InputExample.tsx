import React from 'react';
import {CodeExample} from 'components/CodeExample';
import {Card, Input} from '@majorfi/web-lib/components';
import {format} from '@majorfi/web-lib/utils';

function	InputExample(): React.ReactElement {
	const	[amount, set_amount] = React.useState('');
	const	userBalance = format.BN('2564145567845456084456');
	const	priceOfToken = format.BN('1451454');

	return (
		<CodeExample>
			<Card className={'w-3/4'}>
				<Input.BigNumber
					balance={format.toNormalizedAmount(userBalance, 18)}
					price={format.toNormalizedValue(priceOfToken, 6)}
					value={amount}
					onSetValue={(s: string): void => set_amount(s)}
					maxValue={userBalance}
					decimals={18} />
			</Card>
		</CodeExample>
	);
}

export {InputExample};
export default InputExample;