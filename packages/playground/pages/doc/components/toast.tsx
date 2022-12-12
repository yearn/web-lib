import React from 'react';
import CodeExample from 'components/CodeExample';
import Highlight from 'components/documentation/Highlight';
import {Button, Card} from '@yearn-finance/web-lib/components';
import {useToast} from '@yearn-finance/web-lib/hooks/useToast';

import type {ReactElement} from 'react';

const code = `
import	React		from	'react';
import {useToast} 	from 	'@yearn-finance/web-lib/hooks';

export default function	App(): React.ReactElement {
	const toast = useToast({type: 'success', content: 'Success toast'});

	return (
		<Button
			variant={'light'}
			onClick={toast}>
			{'Success toast'}
		</Button>
	);
}`.trim();

export function ToastComponent(): ReactElement {
	const successToast = useToast({
		type: 'success',
		content: 'Transaction succeed'
	});
	const errorToast = useToast({
		type: 'error',
		content: 'Transaction failed. Insufficient balance'
	});
	const warningToast = useToast({
		type: 'warning',
		content: 'Incorrect Network selected. Please change your wallet to Optimism'
	});
	const infoToast = useToast({
		type: 'info',
		content: 'This is old vault, migrate from here',
		cta: { label: 'Add +', onClick: () => alert('You\'ve clicked the button!')}
	});
	
	return (
		<div className={'grid grid-cols-4 gap-4'}>
			<Button
				variant={'light'}
				onClick={successToast}
				className={'min-w-[132px]'}>
				{'Success toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={errorToast}
				className={'min-w-[132px]'}>
				{'Error toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={warningToast}
				className={'min-w-[132px]'}>
				{'Warning toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={infoToast}
				className={'min-w-[132px]'}>
				{'Info toast'}
			</Button>
		</div>
	);
}

function DocumentationToast(): ReactElement {
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

export default DocumentationToast;
