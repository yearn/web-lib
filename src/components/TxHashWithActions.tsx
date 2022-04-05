import	React, {ReactElement}			from	'react';
import	{truncateHex, copyToClipboard}	from	'../utils/utils';
import	IconLinkOut						from	'../icons/IconLinkOut';
import	IconCopy						from	'../icons/IconCopy';

export type	TTxHashWithActions = {
	txHash: string,
	explorer: string,
	className?: string
};
function	TxHashWithActions({
	txHash,
	explorer = 'https://etherscan.io',
	className = 'font-mono font-bold text-left text-typo-primary'
}: TTxHashWithActions): ReactElement {
	return (
		<span className={'flex flex-row items-center'}>
			<p className={className}>{truncateHex(txHash, 5)}</p>
			<div
				onClick={(): void => copyToClipboard(txHash)}
				className={'px-4 cursor-copy'}>
				<IconCopy className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
			</div>
			<a
				href={`${explorer}/tx/${txHash}`}
				target={'_blank'}
				rel={'noreferrer'}
				className={'cursor-alias'}>
				<span className={'sr-only'}>{'Link to explorer'}</span>
				<IconLinkOut className={'w-4 h-4 transition-colors text-primary hover:text-primary-variant'} />
			</a>
		</span>
	);
}

export {TxHashWithActions};