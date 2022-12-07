import React, { ReactElement } from 'react';
import { Button, Card } from '@yearn-finance/web-lib/components';
import ComponentAPI from 'components/documentation/ComponentAPI';
import Highlight from 'components/documentation/Highlight';
import CodeExample from 'components/CodeExample';
import { toast } from 'react-hot-toast';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';

const code = `
import	React		from	'react';

export default function	App(): React.ReactElement {
	// Todo
}`.trim();

export function ToastComponent(): ReactElement {


	return (
		<div className={'grid grid-cols-4 gap-4'}>

			<Button
				variant={'light'}
				onClick={(): string => toast.success('Success toast')}
				className={'min-w-[132px]'}>
				{'Success toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): string => toast.error('Error toast')}
				className={'min-w-[132px]'}>
				{'Error toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): string => toast((t) => (
					<span className='flex flex-row items-start'>
						<IconAlertWarning />
						Incorrect Network selected. Please change your wallet to Optimism Network
						<IconCross onClick={() => toast.dismiss(t.id)} />
					</span>
				))}
				className={'min-w-[132px]'}>
				{'Warning toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): void => {}}
				className={'min-w-[132px]'}>
				{'Info toast'}
			</Button>
		</div>
	);
}

function DocumentationSwitch(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'Switch'}</h1>
				<CodeExample>
					<ToastComponent />
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'TODO'}</p>
				<p className={'mb-4'}>{'TODO'}</p>
			</Card>
		</section>
	);
}

export default DocumentationSwitch;
