import	React, {ReactElement}		from	'react';
import	{Card, AddressWithActions}	from	'@yearn/web-lib/components';
import	{toAddress}					from	'@yearn/web-lib/utils';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';

const code = `
import	React					from	'react';
import	{Card, AddressWithActions}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Card>
			<AddressWithActions
				address={'0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7'}
				explorer={'https://etherscan.io'}
				truncate={5}
				className={'font-mono text-sm text-typo-secondary'} />
		</Card>
	);
}`.trim();

export function	AddressActionComponent(): ReactElement {
	return (
		<div className={'w-4/5'}>
			<Card>
				<AddressWithActions
					address={toAddress('0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7')}
					explorer={'https://etherscan.io'}
					truncate={5}
					className={'font-mono text-sm text-typo-secondary'} />
			</Card>
		</div>
	);
}

function	DocumentationAddressWithAction(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'AddressWithActions'}</h1>				
				<div className={'box-gradient-default'}>
					<AddressActionComponent />
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The AddressWithActions is generic component that could be used to display an address with some defaults action. The address is mono-formated and can be truncated with an elipsis in the middle.'}</p>
				<p className={'mb-4'}>{'Two actions are available, copy to clipboard and open address in explorer.'}</p>
				<ComponentAPI
					elements={[{
						title: 'address',
						type: 'string',
						description: 'The address to use. The address should be valid and will be checksummed.'
					},
					{
						title: 'explorer',
						type: 'string',
						description: 'Root uri of the explorer linked to this address. Aka what should be the start of the URL when clicking the link-out icon.'
					},
					{
						title: 'truncate',
						type: 'number',
						description: 'How many character should be displayed on the start and end part of the address when truncating it. Use 0 to disable truncate action.'
					},
					{
						title: 'wrapperClassName',
						type: 'string',
						description: 'Style to apply to the <span> wrapping this component.'
					},
					{
						title: 'className',
						type: 'string',
						description: 'Style to apply to the address itself.'
					}]} />
			</Card>
		</section>
	);
}

export default DocumentationAddressWithAction;
