import	React, {ReactElement}		from	'react';
import	{Card, TxHashWithActions}	from	'@yearn/web-lib/components';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';
import	CodeExample					from	'components/CodeExample';

const code = `
import	React						from	'react';
import	{Card, TxHashWithActions}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Card>
			<TxHashWithActions
				txHash={'0x56aa0161072a6dd2661adf6fbebd0cbc6f538f9ad2306cc4cbe5afa06268b2f2'}
				truncate={0}
				explorer={currentVault.explorer}
				className={'font-mono font-bold'} />
		</Card>
	);
}`.trim();

export function	HashActionComponent(): ReactElement {
	return (
		<div className={'w-full md:w-4/5 transition-'}>
			<Card>
				<TxHashWithActions
					txHash={'0x56aa0161072a6dd2661adf6fbebd0cbc6f538f9ad2306cc4cbe5afa06268b2f2'}
					explorer={'https://etherscan.io'}
					truncate={8}
					className={'font-mono text-sm text-typo-secondary'} />
			</Card>
		</div>
	);
}

function	DocumentationTxHashWithAction(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'TxHashWithActions'}</h1>				
				<CodeExample>
					<HashActionComponent />
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The TxHashWithActions is generic component that could be used to display a Tx Hash with some defaults action. The Hash is mono-formated and can be truncated with an elipsis in the middle.'}</p>
				<p className={'mb-4'}>{'Two actions are available, copy to clipboard and open tx in explorer.'}</p>
				<ComponentAPI
					elements={[{
						title: 'txHash',
						type: 'string',
						description: 'The hash to use.'
					},
					{
						title: 'explorer',
						type: 'string',
						description: 'Root uri of the explorer linked to this hash. Aka what should be the start of the URL when clicking the link-out icon.'
					},
					{
						title: 'truncate',
						type: 'number',
						description: 'How many character should be displayed on the start and end part of the hex string when truncating it. Use 0 to disable truncate action.'
					},
					{
						title: 'wrapperClassName',
						type: 'string',
						description: 'Style to apply to the <span> wrapping this component.'
					},
					{
						title: 'className',
						type: 'string',
						description: 'Style to apply to the hash itself.'
					}]} />
			</Card>
		</section>
	);
}

export default DocumentationTxHashWithAction;
