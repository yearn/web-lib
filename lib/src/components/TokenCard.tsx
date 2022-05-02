import	React, {ReactElement} 	from 'react';
import	{Card} 					from './Card';
import	IconChevron				from	'../icons/IconChevron';

export type TTokenCard = {
	label: string;
	value: string;
	imgSrc: string;
	onClick?: React.MouseEventHandler;
} & React.ComponentPropsWithoutRef<'div'>;
function TokenCardBase({label, value, imgSrc, onClick, className, ...props}: TTokenCard): ReactElement {
	const	cardClassname = className || 'col-span-12 sm:col-span-6';
	return (
		<Card
			className={cardClassname}
			padding={'none'}
			{...props}>	
			<button
				className={`flex p-2 md:p-4 w-full h-full ${onClick ? 'hover:bg-surface-variant' : 'cursor-default'}`}
				onClick={onClick}
				tabIndex={onClick ? 0 : -1}>
				<img src={imgSrc} className={'select-none my-auto mr-4 w-16 h-16'} />
				<div className={'flex-col overflow-hidden text-left'}>
					<div className={'mb-2 text-sm text-typo-secondary truncate'}>
						{label}
					</div>
					<div className={'text-xl font-bold tabular-nums text-typo-primary truncate'}>
						{value}
					</div>
				</div>
				{onClick && <IconChevron className={'my-auto ml-auto w-6 h-6 rotate-180 cursor-pointer'} />}
			</button>
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

export const TokenCard = Object.assign(TokenCardBase, {Wrapper});
