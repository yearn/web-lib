import	React, {ReactElement}			from	'react';
import	{truncateHex, copyToClipboard}	from	'../utils/utils';
import	IconLinkOut						from	'../icons/IconLinkOut';
import	IconCopy						from	'../icons/IconCopy';
import type * as TxHashWithActionsTypes	from 	'./TxHashWithActions.d';

function	TxHashWithActions({
	txHash,
	explorer = 'https://etherscan.io',
	truncate = 5,
	wrapperClassName,
	className = 'font-mono font-bold text-left text-typo-primary'
}: TxHashWithActionsTypes.TTxHashWithActions): ReactElement {
	return (
		<span className={`flex flex-row items-center ${wrapperClassName}`}>
			<p className={className}>{truncateHex(txHash, truncate)}</p>
			<div className={'mx-2 md:mx-2'}>
				<button
					onClick={(): void => copyToClipboard(txHash)}
					className={'flex justify-center items-center p-0 w-8 h-8 rounded-lg cursor-copy'}>
					<IconCopy className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
				</button>
			</div>
			<button className={'flex justify-center items-center p-0 w-8 h-8 rounded-lg cursor-copy'}>
				<a
					href={`${explorer}/tx/${txHash}`}
					target={'_blank'}
					rel={'noreferrer'}>
					<span className={'sr-only'}>{'Link to explorer'}</span>
					<IconLinkOut className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
				</a>
			</button>
		</span>
	);
}

export {TxHashWithActions};