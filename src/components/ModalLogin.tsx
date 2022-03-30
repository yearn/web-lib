import	React, {ReactElement}		from	'react';
import	{Modal}						from	'./Modal';
import	IconWalletMetamask			from	'../icons/IconWalletMetamask';
import	IconWalletWalletConnect		from	'../icons/IconWalletWalletConnect';

type		TModalLogin = {
	isOpen: boolean,
	set_isOpen: React.Dispatch<React.SetStateAction<boolean>>,
	connect: (_providerType: number) => Promise<void>,
	walletType: {[key: string]: number},
}
function	ModalLogin({isOpen, set_isOpen, connect, walletType}: TModalLogin): ReactElement {
	return (
		<Modal
			isOpen={isOpen}
			onClose={(): void => set_isOpen(false)}>
			<div className={'p-6 space-y-4'}>
				<div
					onClick={(): void => {
						connect(walletType.METAMASK);
						set_isOpen(false);
					}}
					className={'flex flex-col justify-center items-center p-6 text-center rounded-sm transition-colors cursor-pointer bg-white-blue-2 hover:bg-white-blue-1'}>
					<div>
						<IconWalletMetamask className={'w-12 h-12'} />
					</div>
					<b className={'mt-2 text-lg text-dark-blue-1'}>{'Metamask'}</b>
					<p className={'text-gray-blue-1'}>{'Connect with Metamask'}</p>
				</div>
				<div
					onClick={(): void => {
						connect(walletType.WALLET_CONNECT);
						set_isOpen(false);
					}}
					className={'flex flex-col justify-center items-center p-6 text-center rounded-sm transition-colors cursor-pointer bg-white-blue-2 hover:bg-white-blue-1'}>
					<div>
						<IconWalletWalletConnect className={'w-12 h-12'} />
					</div>
					<b className={'text-2xl text-dark-blue-1'}>{'WalletConnect'}</b>
					<p className={'text-gray-blue-1'}>{'Scan with WalletConnect to connect'}</p>
				</div>
			</div>
		</Modal>
	);
}

export {ModalLogin};