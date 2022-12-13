import React from 'react';
import CodeExample from 'components/CodeExample';
import Highlight from 'components/documentation/Highlight';
import {Button} from '@yearn-finance/web-lib/components/Button';
import {Card} from '@yearn-finance/web-lib/components/Card';
import {yToast} from '@yearn-finance/web-lib/components/yToast';

import type {ReactElement} from 'react';

const code = `
import	React		from	'react';
import {yToast} 	from 	'@yearn-finance/web-lib/components/yToast';

export default function	App(): React.ReactElement {
	const toast = yToast();

	return (
		<Button
			variant={'light'}
			onClick={(): string => toast({type: 'success', content: 'Transaction succeed'})}>
			{'Success toast'}
		</Button>
	);
}`.trim();

export function ToastComponent(): ReactElement {
	const {toast} = yToast();

	return (
		<div className={'grid grid-cols-4 gap-4'}>
			<Button
				variant={'light'}
				onClick={(): string => toast({type: 'success', content: 'Transaction succeed'})}
				className={'min-w-[132px]'}>
				{'Success toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): string => toast({type: 'error', content: 'Transaction failed. Insufficient balance'})}
				className={'min-w-[132px]'}>
				{'Error toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): string => toast({type: 'warning', content: 'Incorrect Network selected. Please change your wallet to Optimism'})}
				className={'min-w-[132px]'}>
				{'Warning toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): string =>toast({
					type: 'info',
					content: 'This is old vault, migrate from here',
					cta: {label: 'Add +', onClick: (): void => alert('You\'ve clicked the button!')}
				})}
				className={'min-w-[132px]'}>
				{'Info toast'}
			</Button>
			<Button
				variant={'light'}
				onClick={(): string => toast({
					type: 'info',
					content: 'This toast needs to be closed explicitly',
					duration: Infinity
				})}
				className={'min-w-[132px]'}>
				{'Eternal toast'}
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
