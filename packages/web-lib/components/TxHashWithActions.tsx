import React, {useEffect, useState} from 'react';
import {useSettings} from '@yearn-finance/web-lib/contexts';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import IconCopy from '@yearn-finance/web-lib/icons/IconCopy';
import IconLinkOut from '@yearn-finance/web-lib/icons/IconLinkOut';
import {copyToClipboard} from '@yearn-finance/web-lib/utils';
import {truncateHex} from '@yearn-finance/web-lib/utils/address';

import type {ReactElement} from 'react';

export type TTxHashWithActions = {
	txHash: string;
	explorer: string;
	truncate?: number;
	wrapperClassName?: string;
	className?: string;
};

function	TxHashWithActions(props: TTxHashWithActions): ReactElement {
	const	{txHash, explorer = '', truncate = 5, wrapperClassName, className = ''} = props;
	const	{networks} = useSettings();
	const	[explorerURI, set_explorerURI] = useState('');
	const	{safeChainID} = useChainID();

	useEffect((): void => {
		if (explorer !== '') {
			set_explorerURI(explorer);
		} else if (networks[safeChainID]?.explorerBaseURI) {
			set_explorerURI(networks[safeChainID].explorerBaseURI as string);
		}
	}, [safeChainID, explorer, networks]);

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
