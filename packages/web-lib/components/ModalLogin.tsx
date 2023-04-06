import React, {cloneElement} from 'react';
import {Modal} from '@yearn-finance/web-lib/components/Modal';
import {yToast} from '@yearn-finance/web-lib/components/yToast';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useInjectedWallet} from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletCoinbase from '@yearn-finance/web-lib/icons/IconWalletCoinbase';
import IconWalletGnosis from '@yearn-finance/web-lib/icons/IconWalletGnosis';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';

import type {ReactElement} from 'react';
import type {TWalletProvider} from '@yearn-finance/web-lib/hooks/useInjectedWallet';

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
			<div className={'yearn--modalLogin'}>
				<div
					onClick={(): void => {
						const	ethereum = (window?.ethereum as TWalletProvider);
						const	isLedger = ethereum?.isLedgerConnect;
						onConnect(
							isLedger ? 'INJECTED_LEDGER' : 'INJECTED',
							(error): string => toast({content: error.message ?? 'Unsupported network. Please use Ethereum mainnet.', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
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
					className={'yearn--modalLogin-card'}>
					<div><IconWalletWalletConnect className={'h-12 w-12'} /></div>
					<b>{'WalletConnect'}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							'EMBED_COINBASE',
							(error): string => toast({content: error.message ??'Invalid chain', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div><IconWalletCoinbase className={'h-12 w-12'} /></div>
					<b>{'Coinbase'}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							'EMBED_GNOSIS_SAFE',
							(error): string => toast({content: error.message ?? 'Invalid chain', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div><IconWalletGnosis className={'h-12 w-12'} /></div>
					<b>{'Gnosis'}</b>
				</div>
			</div>
		</Modal>
	);
}

export {ModalLogin};
