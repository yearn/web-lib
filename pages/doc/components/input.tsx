import	React, {ReactElement}		from	'react';
import	{Card, Input}				from	'@yearn/web-lib/components';
import	{format}					from	'@yearn/web-lib/utils';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';
import	CodeExample					from	'components/CodeExample';

const code = `
import	React			from	'react';
import	{Button}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	const	[amount, set_amount] = React.useState('');
	const	userBalance = format.BN('2564145567845456084456');
	const	priceOfToken = format.BN('1451454');

	return (
		<Input.BigNumber
			balance={format.toNormalizedAmount(userBalance, 18)}
			price={format.toNormalizedValue(priceOfToken, 6)}
			value={amount}
			onSetValue={(s: string): void => set_amount(s)}
			maxValue={userBalance}
			decimals={18} />
	);
}`.trim();

export function	InputComponent(): ReactElement {
	const	[amount, set_amount] = React.useState('');
	const	userBalance = format.BN('2564145567845456084456');
	const	priceOfToken = format.BN('1451454');
	return (
		<div className={'py-2 px-4 mx-auto w-full max-w-[400px] h-24 rounded-lg md:py-4 md:px-6 md:h-32 bg-background'}>
			<Input.BigNumber
				balance={format.toNormalizedAmount(userBalance, 18)}
				price={format.toNormalizedValue(priceOfToken, 6)}
				value={amount}
				onSetValue={(s: string): void => set_amount(s)}
				maxValue={userBalance}
				decimals={18} />
		</div>
	);
}

function	DocumentationInput(): ReactElement {
	return (
		<section aria-label={'BigNumber input'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'Input.BigNumber'}</h1>
				<CodeExample>
					<InputComponent />
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-4'}>{'The BigNumber variant of the Input is focused to work correctly with web3 components and BigNumber values. Working with that bring a few tricky parts, especially when you want to work with prices, values and amount.'}</p>
				<p className={'mb-4'}>{'The component integrate some built-in check and error managements based on the provided values, and behave as a number input (so you can use the keyboard arrows to change the value).'}</p>
				<p className={'mb-4'}>{'All default <input> props are supported and a few extra must be used:'}</p>

				<ComponentAPI
					elements={[{
						title: 'value',
						type: 'string',
						description: 'It\'s what the user will type. It is not a big number, just plain humanized number, not scaled with the decimals. 1 USDC = 1000000 wei. This should be a React.useState value.'
					},
					{
						title: 'onSetValue',
						type: 'function',
						description: 'Trigger a change in the value. It will be a string, not a big number. This should be a React.useState setter. This is triggered everytime the user type something or when he clicks MAX.'
					},
					{
						title: 'onValueChange?',
						type: 'function',
						description: 'Callback to trigger a custom update when the value changes. Ommited by default.'
					},
					{
						title: 'withMax',
						type: 'boolean',
						description: 'Do we want to use the Max feature. The max feature will display a Max button for the user to click to set the value to the max value. If withMax is enabled, the error management will also be enabled.'
					},
					{
						title: 'maxValue',
						type: 'BigNumber',
						description: 'BigNumber matching the maximum allowed value. This is the value that will be used when the user click on the Max button. If withMax is disabled, this value will be ignored.'
					},
					{
						title: 'decimals',
						type: 'number',
						description: 'How many decimals are required to scale the number for plain humanized value to wei ones. This is used with the maxValue feature to set and check the correct input.'
					},
					{
						title: 'balance',
						type: 'string',
						description: 'It will display the user\'s balance above the value. This is a string, not a big number. The displayed string will be: "You have [balance]".'
					},
					{
						title: 'price',
						type: 'number',
						description: 'It will display the value matching the amount typed. Value will be formated for USD display.'
					}]} />
			</Card>
		</section>
	);
}

export default DocumentationInput;
