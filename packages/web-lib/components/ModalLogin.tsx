import React, {cloneElement, useCallback} from 'react';
import {Modal} from '@yearn-finance/web-lib/components/Modal';
import {yToast} from '@yearn-finance/web-lib/components/yToast';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useInjectedWallet} from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';

import type {ReactElement} from 'react';

export type	TModalLogin = {
	isOpen: boolean,
	onClose: () => void
};

function ModalLogin(props: TModalLogin): ReactElement {
	const	{isOpen, onClose} = props;
	const	{onConnect} = useWeb3();
	const	detectedWalletProvider = useInjectedWallet();
	const 	{toast} = yToast();

	const onInjectedConnect = useCallback((): void => {
		onConnect(
			detectedWalletProvider.type,
			(error): string => toast({content: error?.message ?? 'Impossible to connect wallet', type: 'error'}),
			(): void => onClose()
		);
	}, [detectedWalletProvider, onConnect, onClose, toast]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={(): void => onClose()}>
			<div className={'p-6'}>
				<div className={'w-full md:w-3/4'}>
					<b>{'Connect your wallet'}</b>
					<p className={'text-sm text-neutral-500'}>
						{'Select your wallet from the options to get started.'}
					</p>
				</div>
			</div>
			<div className={'yearn--modalLogin gap-6 px-6 pb-6'}>
				<div
					onClick={onInjectedConnect}
					className={'yearn--modalLogin-card !bg-neutral-100/40 hover:!bg-neutral-100'}>
					<div>{cloneElement(detectedWalletProvider.icon, {className: 'w-12 h-12'})}</div>
					<b>{detectedWalletProvider.name}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							'WALLET_CONNECT',
							(error): string => toast({content: error.message ?? 'Invalid chain', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card cursor-not-allowed !bg-neutral-100/40 !opacity-25'}>
					<div><IconWalletWalletConnect className={'h-12 w-12'} /></div>
					<b>{'WalletConnect'}</b>
				</div>
				<p className={'col-span-2 text-center text-xs !text-neutral-500'}>{'WalletConnect is temporarily disabled due to a shutdown of their V1 services. As soon as we will be whitelisted on their V2, this functionality will be reenabled.'}</p>

			</div>
		</Modal>
	);
}

export {ModalLogin};
