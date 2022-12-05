import React from 'react';
import {Card} from '@yearn-finance/web-lib/components/Card';

import type {ReactElement, ReactNode} from 'react';

export type TStatisticCard = {
	label: string;
	value: ReactNode;
	variant?: 'surface' | 'background';
} & React.ComponentPropsWithoutRef<'div'>;

function StatisticCardBase(props: TStatisticCard): ReactElement {
	const	{label, value, ...rest} = props;
	const	className = rest.className || 'col-span-12 md:col-span-4';

	return (
		<Card
			className={`flex flex-col ${className}`}
			padding={'narrow'}
			{...rest}>
			<div className={'mb-2 text-sm text-neutral-500'}>
				{label}
			</div>
			<div className={'text-xl font-bold tabular-nums text-neutral-700'}>
				{value}
			</div>
		</Card>
	);
}

type		TWrapper = {children: ReactElement[]}
function	Wrapper({children}: TWrapper): ReactElement {
	return (
		<div className={'grid grid-cols-12 gap-4'}>
			{children}
		</div>
	);
}

export const StatisticCard = Object.assign(StatisticCardBase, {Wrapper});
