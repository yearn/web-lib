import React, {useEffect, useState} from 'react';
import {useSettings} from '@yearn-finance/web-lib/contexts';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import IconCopy from '@yearn-finance/web-lib/icons/IconCopy';
import IconLinkOut from '@yearn-finance/web-lib/icons/IconLinkOut';
import {copyToClipboard} from '@yearn-finance/web-lib/utils';
import {toENS} from '@yearn-finance/web-lib/utils/address';

import type {ReactElement} from 'react';
import type {TAddress} from '@yearn-finance/web-lib/utils/address';

export type TAddressWithActions = {
	address: TAddress;
	explorer: string;
	truncate?: number;
	wrapperClassName?: string;
	className?: string;
};

function	AddressWithActions(props: TAddressWithActions): ReactElement {
	const	{address, explorer = '', truncate = 5, wrapperClassName, className = ''} = props;
	const	{networks} = useSettings();
	const	{safeChainID} = useChainID();
	const	[explorerURI, set_explorerURI] = useState('');

	useEffect((): void => {
		if (explorer !== '') {
			set_explorerURI(explorer);
		} else if (networks[safeChainID]?.explorerBaseURI) {
			set_explorerURI(networks[safeChainID].explorerBaseURI as string);
		}
	}, [safeChainID, explorer, networks]);

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
