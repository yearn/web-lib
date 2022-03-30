import	React, {ReactElement} from 'react';
import	{Card} from './Card';

export type TStatisticCard = {
	onClick?: React.MouseEventHandler;
	label: string;
	value: string;
	backgroundColor?: string;
	cols?: {mobile: number, desktop: number}
} & React.ComponentPropsWithoutRef<'div'>;
function StatisticCardBase({label, value, cols = {mobile: 2, desktop: 1}, ...props}: TStatisticCard): ReactElement {
	return (
		<Card
			className={`flex flex-col col-span-${cols.mobile} md:col-span-${cols.desktop}`}
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

type		TWrapper = {children: ReactElement[], cols?: {mobile: number, desktop: number}}
function	Wrapper({children, cols = {mobile: 2, desktop: 3}}: TWrapper): ReactElement {
	return (
		<div className={`grid gap-4 grid-cols-${cols.mobile} md:grid-cols-${cols.desktop}`}>
			{children}
		</div>
	);
}

export const StatisticCard = Object.assign(StatisticCardBase, {Wrapper});