import	React, {ReactElement}				from	'react';
import	{toENS, copyToClipboard}			from	'../utils/utils';
import	IconLinkOut							from	'../icons/IconLinkOut';
import	IconCopy							from	'../icons/IconCopy';
import type * as AddressWithActionsTypes	from	'./AddressWithActions.d';

function	AddressWithActions({
	address,
	explorer = 'https://etherscan.io',
	truncate = 5,
	wrapperClassName,
	className = 'font-mono font-bold text-left text-typo-primary'
}: AddressWithActionsTypes.TAddressWithActions): ReactElement {
	return (
		<span className={`flex flex-row items-center ${wrapperClassName}`}>
			<p className={className}>{toENS(address, truncate > 0, truncate)}</p>
			<div className='mx-2 md:mx-2'>
				<button
					onClick={(): void => copyToClipboard(address)}
					className={'cursor-copy w-8 h-8 justify-center items-center flex p-0 rounded-lg'}>
					<IconCopy className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
				</button>
			</div>
			<a
				href={`${explorer}/address/${address}`}
				target={'_blank'}
				rel={'noreferrer'}
				className={'cursor-copy w-8 h-8 justify-center items-center flex p-0 rounded-lg'}>
				<span className={'sr-only'}>{'Link to explorer'}</span>
				<IconLinkOut className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
			</a>
		</span>
	);
}

export {AddressWithActions};