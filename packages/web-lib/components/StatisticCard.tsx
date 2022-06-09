import	React, {ReactElement} from 'react';
import	{Card} from './Card';
import type * as StatisticCardTypes	from './StatisticCard.d';

function StatisticCardBase({label, value, ...props}: StatisticCardTypes.TStatisticCard): ReactElement {
	const	className = props.className || 'col-span-12 md:col-span-4';
	return (
		<Card
			className={`flex flex-col ${className}`}
			padding={'narrow'}
			{...props}>
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