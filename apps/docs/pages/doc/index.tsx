import	React, {ReactElement}		from	'react';
import	{useBlock, useBalance}	from	'@yearn-finance/web-lib/hooks';

function	Index(): ReactElement {
	const	{data: block} = useBlock({
		shouldShallowWatch: true,
		shallowCallback(block, error?): void {
			console.log('shallowCallback', block, error);
		}
	});
	const	{data: ethBalance} = useBalance({refreshEvery: 'block'});
	const	{data: usdcBalance} = useBalance({token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'});
	
	console.log({ethBalance: ethBalance.formatted, usdcBalance, blockNumber: block.number});
	return (
		<section aria-label={'some default section'}>
			{'Nothing to see here. Yet.'}
		</section>
	);
}

export default Index;
