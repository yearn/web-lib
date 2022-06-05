import	React, {ReactElement}				from	'react';
import	{truncateHex, copyToClipboard}		from	'../utils/utils';
import	IconLinkOut							from	'../icons/IconLinkOut';
import	IconCopy							from	'../icons/IconCopy';
import type * as TxHashWithActionsTypes		from	'./TxHashWithActions.d';

function	TxHashWithActions({
	txHash,
	explorer = 'https://etherscan.io',
	truncate = 5,
	wrapperClassName,
	className = ''
}: TxHashWithActionsTypes.TTxHashWithActions): ReactElement {
	return (
		<span className={`flex flex-row items-center ${wrapperClassName}`}>
			<p className={`yearn--elementWithActions ${className}`}>{truncateHex(txHash, truncate)}</p>
			<button
				className={'yearn--elementWithActions-copy'}
				onClick={(e): void => {
					e.stopPropagation();
					copyToClipboard(txHash);
				}}>
				<IconCopy className={'yearn--elementWithActions-icon'} />
			</button>
			<button className={'yearn--elementWithActions-linkout'}>
				<a
					onClick={(e): void => e.stopPropagation()}
					href={`${explorer}/address/${txHash}`}
					target={'_blank'}
					className={'cursor-alias'}
					rel={'noreferrer'}>
					<span className={'sr-only'}>{'Link to explorer'}</span>
					<IconLinkOut className={'yearn--elementWithActions-icon'} />
				</a>
			</button>
		</span>
	);
}

export {TxHashWithActions};
