import	React, {ReactElement} from 'react';
import	{Card} from './Card';

export type TStatisticCard = {
	onClick?: React.MouseEventHandler;
	label: string;
	value: string;
	backgroundColor?: string;
} & React.ComponentPropsWithoutRef<'div'>;
function StatisticCardBase({label, value, ...props}: TStatisticCard): ReactElement {
	const	className = props.className || 'col-span-12 md:col-span-4';
	return (
		<Card
			className={`flex flex-col ${className}`}
			isNarrow
			{...props}>
			<div className={'mb-2 text-sm text-typo-secondary'}>
				{label}
			</div>
			<div className={'text-xl font-bold tabular-nums text-typo-primary'}>
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