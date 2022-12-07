import React, {useState} from 'react';
import {CodeExample} from 'components/CodeExample';
import {Card} from '@yearn-finance/web-lib/components/Card';
import {Input} from '@yearn-finance/web-lib/components/Input';
import {formatBN, formatToNormalizedAmount, formatToNormalizedValue} from '@yearn-finance/web-lib/utils/format.bigNumber';

function	InputExample(): React.ReactElement {
	const	[amount, set_amount] = useState('');
	const	userBalance = formatBN('2564145567845456084456');
	const	priceOfToken = formatBN('1451454');

	return (
		<CodeExample>
			<Card className={'w-3/4'}>
				<Input.BigNumber
					balance={formatToNormalizedAmount(userBalance, 18)}
					price={formatToNormalizedValue(priceOfToken, 6)}
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