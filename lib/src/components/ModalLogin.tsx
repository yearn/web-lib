import	React, {ReactElement}		from	'react';
import	toast						from	'react-hot-toast';
import	{Modal}						from	'./Modal';
import	{useWeb3}					from	'../contexts/useWeb3';
import	IconWalletMetamask			from	'../icons/IconWalletMetamask';
import	IconWalletWalletConnect		from	'../icons/IconWalletWalletConnect';
import	IconWalletCoinbase			from	'../icons/IconWalletCoinbase';
import	IconWalletGnosis			from	'../icons/IconWalletGnosis';
import * as ModalLoginTypes			from 	'./ModalLogin.d';

function	ModalLogin({isOpen, onClose, walletType}: ModalLoginTypes.TModalLogin): ReactElement {
	const	{onConnect} = useWeb3();

	return (
		<Modal
			isOpen={isOpen}
			onClose={(): void => onClose()}>
			<div className={'p-6 space-y-4 grid grid-cols-2'}>
				<div
					onClick={(): void => {
						onConnect(
							walletType.METAMASK,
							(): string => toast.error('Unsupported network. Please use Ethereum mainnet.'),
							(): void => onClose()
						);
					}}
					className={'flex flex-col justify-center items-center py-6 px-2 text-center rounded-sm transition-colors cursor-pointer bg-surface hover:bg-surface-variant'}>
					<div>
						<IconWalletMetamask className={'w-12 h-12'} />
					</div>
					<b className={'mt-2 text-xl text-typo-primary'}>{'Metamask'}</b>
					<p className={'typo-secondary'}>{'Connect with Metamask'}</p>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							walletType.WALLET_CONNECT,
							(): string => toast.error('Invalid chain'),
							(): void => onClose()
						);
					}}
					className={'flex flex-col justify-center items-center py-6 px-2 text-center rounded-sm transition-colors cursor-pointer bg-surface hover:bg-surface-variant'}>
					<div>
						<IconWalletWalletConnect className={'w-12 h-12'} />
					</div>
					<b className={'mt-2 text-xl text-typo-primary'}>{'WalletConnect'}</b>
					<p className={'typo-secondary'}>{'Connect with WalletConnect'}</p>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							walletType.COINBASE,
							(): string => toast.error('Invalid chain'),
							(): void => onClose()
						);
					}}
					className={'flex flex-col justify-center items-center py-6 px-2 text-center rounded-sm transition-colors cursor-pointer bg-surface hover:bg-surface-variant'}>
					<div>
						<IconWalletCoinbase className={'w-12 h-12'} />
					</div>
					<b className={'mt-2 text-xl text-typo-primary'}>{'Coinbase Wallet'}</b>
					<p className={'typo-secondary'}>{'Connect with Coinbase Wallet'}</p>
				</div>
				<div
					onClick={(): void => {
						onConnect(
							walletType.EMBED_GNOSIS_SAFE,
							(): string => toast.error('Invalid chain'),
							(): void => onClose()
						);
					}}
					className={'flex flex-col justify-center items-center py-6 px-2 text-center rounded-sm transition-colors cursor-pointer bg-surface hover:bg-surface-variant'}>
					<div>
						<IconWalletGnosis className={'w-12 h-12'} />
					</div>
					<b className={'mt-2 text-xl text-typo-primary'}>{'Gnosis Safe'}</b>
					<p className={'typo-secondary'}>{'Connect with Gnosis Safe'}</p>
				</div>
			</div>
		</Modal>
	);
}

export {ModalLogin};