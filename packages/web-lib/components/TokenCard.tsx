/* eslint-disable @next/next/no-img-element */
import React, {ReactElement} from 'react';
import {Card} from '@yearn-finance/web-lib/components/Card';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';

import type {TTokenCard} from './TokenCard.d';

function TokenCardBase(props: TTokenCard): ReactElement {
	const	{label, value, imgSrc, onClick, className, ...rest} = props;
	const	cardClassname = className || 'col-span-12 sm:col-span-6';

	return (
		<Card
			className={cardClassname}
			padding={'none'}
			{...rest}>	
			<button
				className={`rounded-default flex h-full w-full p-2 md:p-4 ${onClick ? 'hover:bg-neutral-100' : 'cursor-default'}`}
				onClick={onClick}
				tabIndex={onClick ? 0 : -1}>
				<img
					alt={''}
					src={imgSrc}
					className={'my-auto mr-4 h-16 w-16 select-none'} />
				<div className={'flex-col overflow-hidden text-left'}>
					<div className={'mb-2 truncate text-sm text-neutral-500'}>
						{label}
					</div>
					<div className={'truncate text-xl font-bold tabular-nums text-neutral-700'}>
						{value}
					</div>
				</div>
				{onClick && <IconChevron className={'my-auto ml-auto h-6 w-6 rotate-180 cursor-pointer'} />}
			</button>
		</Card>
	);
}

function	Wrapper({children}: {children: ReactElement[]}): ReactElement {
	return (
		<div className={'grid grid-cols-12 gap-4'}>
			{children}
		</div>
	);
}

export const TokenCard = Object.assign(TokenCardBase, {Wrapper});
