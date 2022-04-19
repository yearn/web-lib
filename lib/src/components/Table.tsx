import	React, {ReactElement} from 'react';
import	{Card} from './Card';

export type TStatisticCard = {
	label: string;
	value: string;
	variant?: 'surface' | 'background',
} & React.ComponentPropsWithoutRef<'div'>;
function StatisticCardBase({label, value, ...props}: TStatisticCard): ReactElement {
	const	className = props.className || 'col-span-12 md:col-span-4';
	return (
		<Card
			className={`flex flex-col ${className}`}
			padding={'narrow'}
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

function	Header(): ReactElement {
	return (
		<div className="sm:flex sm:items-center">
			<div className="sm:flex-auto">
				<h1 className="text-xl font-semibold text-gray-900">Users</h1>
				<p className="mt-2 text-sm text-gray-700">
					A list of all the users in your account including their name, title, email and role.
				</p>
			</div>
			<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
				Add user
				</button>
			</div>
			</div>
	);
}

export const StatisticCard = Object.assign(StatisticCardBase, {Header});