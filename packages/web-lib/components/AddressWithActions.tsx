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
	className = ''
}: AddressWithActionsTypes.TAddressWithActions): ReactElement {
	return (
		<span className={`flex flex-row items-center ${wrapperClassName}`}>
			<p className={`yearn--addressWithActions ${className}`}>{toENS(address, truncate > 0, truncate)}</p>
			<div className={'mx-2 md:mx-2'}>
				<button
					onClick={(e): void => {
						e.stopPropagation();
						copyToClipboard(address);
					}}>
					<IconCopy className={'yearn--addressWithActions-icon'} />
				</button>
			</div>
			<button>
				<a
					onClick={(e): void => e.stopPropagation()}
					href={`${explorer}/address/${address}`}
					target={'_blank'}
					rel={'noreferrer'}>
					<span className={'sr-only'}>{'Link to explorer'}</span>
					<IconLinkOut className={'yearn--addressWithActions-icon'} />
				</a>
			</button>
		</span>
	);
}

export {AddressWithActions};