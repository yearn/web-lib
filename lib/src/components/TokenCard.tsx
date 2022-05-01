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
			className={`${onClick ? 'cursor-pointer hover:bg-surface-variant' : ''} ${cardClassname}`}
			padding={'none'}
			{...props}
		>	
			<div className={'flex p-2 md:p-4'} onClick={onClick}>
				<img src={imgSrc} className={'select-none my-auto mr-4 w-16 h-16'} />
				<div className={'flex-col overflow-hidden'}>
					<div className={'mb-2 text-sm text-typo-secondary truncate'}>
						{label}
					</div>
					<div className={'text-xl font-bold tabular-nums text-typo-primary truncate'}>
						{value}
					</div>
				</div>
				{onClick && <div className={'flex justify-center items-center ml-auto'}>
					<IconChevron className={'w-6 h-6 rotate-180 cursor-pointer'} />
				</div>}
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

export const TokenCard = Object.assign(TokenCardBase, {Wrapper});
