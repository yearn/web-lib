import React, {ReactElement, useEffect, useState} from 'react';
import {useSettings, useWeb3} from '@yearn-finance/web-lib/contexts';
import IconCopy from '@yearn-finance/web-lib/icons/IconCopy';
import IconLinkOut from '@yearn-finance/web-lib/icons/IconLinkOut';
import {copyToClipboard, truncateHex} from '@yearn-finance/web-lib/utils';

import type {TTxHashWithActions} from './TxHashWithActions.d';

function	TxHashWithActions(props: TTxHashWithActions): ReactElement {
	const	{txHash, explorer = '', truncate = 5, wrapperClassName, className = ''} = props;
	const	{networks} = useSettings();
	const	{chainID} = useWeb3();
	const	[explorerURI, set_explorerURI] = useState('');

	useEffect((): void => {
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
