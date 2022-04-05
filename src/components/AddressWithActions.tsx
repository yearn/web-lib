import	React, {ReactElement}				from	'react';
import	{toENS, copyToClipboard, TAddress}	from	'../utils/utils';
import	IconLinkOut							from	'../icons/IconLinkOut';
import	IconCopy							from	'../icons/IconCopy';

export type	TAddressWithActions = {
	address: TAddress,
	explorer: string,
	truncate?: number,
	wrapperClassName?: string
	className?: string
};
function	AddressWithActions({
	address,
	explorer = 'https://etherscan.io',
	truncate = 5,
	wrapperClassName,
	className = 'font-mono font-bold text-left text-typo-primary'
}: TAddressWithActions): ReactElement {
	return (
		<span className={`flex flex-row items-center ${wrapperClassName}`}>
			<p className={className}>{toENS(address, truncate > 0, truncate)}</p>
			<div
				onClick={(): void => copyToClipboard(address)}
				className={'px-2 cursor-copy md:px-4'}>
				<IconCopy className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
			</div>
			<a
				href={`${explorer}/address/${address}`}
				target={'_blank'}
				rel={'noreferrer'}
				className={'cursor-alias'}>
				<span className={'sr-only'}>{'Link to explorer'}</span>
				<IconLinkOut className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
			</a>
		</span>
	);
}

export {AddressWithActions};