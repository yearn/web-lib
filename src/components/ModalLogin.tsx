import React, {cloneElement, useCallback} from 'react';

import type {ReactElement} from 'react';
import { useWeb3 } from '../contexts/useWeb3';
import { useInjectedWallet } from '../hooks/useInjectedWallet';
import { IconWalletWalletConnect } from '../icons/IconWalletWalletConnect';
import { Modal } from './Modal';
import { yToast } from './yToast';

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
			(error: { message: any; }): string => toast({content: error?.message ?? 'Impossible to connect wallet', type: 'error'}),
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
							(error: unknown): string => {
								if (!error || typeof error !== 'object' || !('message' in error) || typeof error.message !== 'string') {
									return toast({content: 'Impossible to connect wallet', type: 'error'});
								}
								return toast({content: error.message, type: 'error'});
							},
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card !bg-neutral-100/40'}>
					<div><IconWalletWalletConnect className={'h-12 w-12'} /></div>
					<b>{'WalletConnect'}</b>
				</div>
			</div>
		</Modal>
	);
}

export {ModalLogin};
