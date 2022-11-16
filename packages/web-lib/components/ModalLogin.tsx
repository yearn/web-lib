import React, {ReactElement} from 'react';
import {toast} from 'react-hot-toast';
import {Modal} from '@yearn-finance/web-lib/components/Modal';
import {useWeb3} from '@yearn-finance/web-lib/contexts';
import IconWalletCoinbase from '@yearn-finance/web-lib/icons/IconWalletCoinbase';
import IconWalletGnosis from '@yearn-finance/web-lib/icons/IconWalletGnosis';
import IconWalletMetamask from '@yearn-finance/web-lib/icons/IconWalletMetamask';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';

import type {TDict} from '../utils';

export type	TModalLogin = {
	isOpen: boolean,
	onClose: () => void
	walletType: TDict<number>;
};

function ModalLogin(props: TModalLogin): ReactElement {
	const	{isOpen, onClose, walletType} = props;
	const	{onConnect} = useWeb3();

	return (
		<Modal
			isOpen={isOpen}
			onClose={(): void => onClose()}>
			<div className={'yearn--modalLogin'}>
				<div
					onClick={(): void => {
						onConnect(
							walletType.METAMASK,
							(): string => toast.error('Unsupported network. Please use Ethereum mainnet.'),
							(): void => onClose()
						);
					}}
					className={'yearn--modalLogin-card'}>
					<div><IconWalletMetamask /></div>
					<b>{'Metamask'}</b>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							walletType.WALLET_CONNECT,
							(): string => toast.error('Invalid chain'),
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
							walletType.COINBASE,
							(): string => toast.error('Invalid chain'),
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
							walletType.EMBED_GNOSIS_SAFE,
							(): string => toast.error('Invalid chain'),
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
