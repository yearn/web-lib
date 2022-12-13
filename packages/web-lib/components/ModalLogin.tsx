import React, {cloneElement} from 'react';
import {Modal} from '@yearn-finance/web-lib/components/Modal';
import {yToast} from '@yearn-finance/web-lib/components/yToast';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useInjectedWallet} from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletCoinbase from '@yearn-finance/web-lib/icons/IconWalletCoinbase';
import IconWalletGnosis from '@yearn-finance/web-lib/icons/IconWalletGnosis';
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
			<div className={'yearn--modalLogin'}>
				<div
					onClick={(): void => {
						onConnect(
							'INJECTED',
							(): string => toast({content: 'Unsupported network. Please use Ethereum mainnet.', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div>{cloneElement(detectedWalletProvider.icon)}</div>
					<b>{detectedWalletProvider.name}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							'WALLET_CONNECT',
							(): string => toast({content: 'Invalid chain', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div><IconWalletWalletConnect /></div>
					<b>{'WalletConnect'}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							'EMBED_COINBASE',
							(): string => toast({content: 'Invalid chain', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div><IconWalletCoinbase /></div>
					<b>{'Coinbase'}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							'EMBED_GNOSIS_SAFE',
							(): string => toast({content: 'Invalid chain', type: 'error'}),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div><IconWalletGnosis /></div>
					<b>{'Gnosis'}</b>
				</div>
			</div>
		</Modal>
	);
}

export {ModalLogin};
