import React, {cloneElement} from 'react';
import {useWeb3} from 'contexts/useWeb3';
import {Modal} from '@yearn-finance/web-lib/components/Modal';
import {yToast} from '@yearn-finance/web-lib/components/yToast';
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
					onClick={(): void => {
						onConnect(
							detectedWalletProvider.type,
							(error): string => toast({content: error.message ?? 'Unsupported network. Please use Ethereum mainnet.', type: 'error'}),
							(): void => onClose()
						);
					}}
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
					className={'yearn--modalLogin-card !bg-neutral-100/40 hover:!bg-neutral-100'}>
					<div><IconWalletWalletConnect className={'h-12 w-12'} /></div>
					<b>{'WalletConnect'}</b>
				</div>
			</div>
		</Modal>
	);
}

export {ModalLogin};
