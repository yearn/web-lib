import	React, {ReactElement}				from	'react';
import	{useSettings}						from	'../contexts/useSettings';
import	{useWeb3}							from	'../contexts/useWeb3';
import	{toENS, copyToClipboard}			from	'../utils/utils';
import	IconLinkOut							from	'../icons/IconLinkOut';
import	IconCopy							from	'../icons/IconCopy';
import type * as AddressWithActionsTypes	from	'./AddressWithActions.d';

function	AddressWithActions({
	address,
	explorer = '',
	truncate = 5,
	wrapperClassName,
	className = ''
}: AddressWithActionsTypes.TAddressWithActions): ReactElement {
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
			<p className={`yearn--elementWithActions ${className}`}>{toENS(address, truncate > 0, truncate)}</p>
			<button
				className={'yearn--elementWithActions-copy'}
				onClick={(e): void => {
					e.stopPropagation();
					copyToClipboard(address);
				}}>
				<IconCopy className={'yearn--elementWithActions-icon'} />
			</button>
			<button className={'yearn--elementWithActions-linkout'}>
				<a
					onClick={(e): void => e.stopPropagation()}
					href={`${explorerURI}/address/${address}`}
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

export {AddressWithActions};
