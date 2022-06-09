import	React, {ReactElement} 	from 'react';
import	{Card} 					from './Card';
import	IconChevron				from '../icons/IconChevron';
import type * as TokenCardTypes	from './TokenCard.d';

function TokenCardBase({label, value, imgSrc, onClick, className, ...props}: TokenCardTypes.TTokenCard): ReactElement {
	const	cardClassname = className || 'col-span-12 sm:col-span-6';
	return (
		<Card
			className={cardClassname}
			padding={'none'}
			{...props}>	
			<button
				className={`flex p-2 md:p-4 w-full h-full rounded-lg ${onClick ? 'hover:bg-neutral-100' : 'cursor-default'}`}
				onClick={onClick}
				tabIndex={onClick ? 0 : -1}>
				<img src={imgSrc} className={'my-auto mr-4 w-16 h-16 select-none'} />
				<div className={'overflow-hidden flex-col text-left'}>
					<div className={'mb-2 text-sm truncate text-neutral-500'}>
						{label}
					</div>
					<div className={'text-xl font-bold tabular-nums truncate text-neutral-700'}>
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
