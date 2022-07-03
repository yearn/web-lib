import	React, {ReactElement}				from	'react';
import	{useSettings}						from	'../contexts/useSettings';
import	{useWeb3}							from	'../contexts/useWeb3';
import	{truncateHex, copyToClipboard}		from	'../utils/utils';
import	IconLinkOut							from	'../icons/IconLinkOut';
import	IconCopy							from	'../icons/IconCopy';
import type * as TxHashWithActionsTypes		from	'./TxHashWithActions.d';

function	TxHashWithActions({
	txHash,
	explorer = '',
	truncate = 5,
	wrapperClassName,
	className = ''
}: TxHashWithActionsTypes.TTxHashWithActions): ReactElement {
	const	{networks} = useSettings();
	const	{chainID} = useWeb3();
	const	[explorerURI, set_explorerURI] = React.useState('');

	React.useEffect((): void => {
		if (explorer !== '') {
			set_explorerURI(explorer);
		} else if (networks[chainID]?.explorerBaseURI) {
			set_explorerURI(networks[chainID].explorerBaseURI as string);
		}
	}, [chainID, explorer, networks]);

	return (
		<span className={`yearn--elementWithActions-wrapper ${wrapperClassName}`}>
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
					href={`${explorerURI}/tx/${txHash}`}
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
