import React, {cloneElement, useEffect, useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useInjectedWallet} from '@yearn-finance/web-lib/hooks/useInjectedWallet';
import IconWalletGnosis from '@yearn-finance/web-lib/icons/IconWalletGnosis';
import IconWalletWalletConnect from '@yearn-finance/web-lib/icons/IconWalletWalletConnect';
import {truncateHex} from '@yearn-finance/web-lib/utils/address';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';

import type {ReactElement} from 'react';

function	LoginStepWallet({onFocus}: {onFocus: VoidFunction}): ReactElement {
	const	{onConnect} = useWeb3();
	const	detectedWalletProvider = useInjectedWallet();

	return (
		<div className={'yearn--shadow overflow-hidden pt-4'}>
			<div className={'flex flex-col space-y-2 px-4'}>
				<b className={'flex text-xl text-neutral-900'}>
					{'Connect wallet'}
				</b>
			</div>
			<div className={'grid w-full grid-cols-1 py-4'}>
				<button
					className={'group relative flex flex-row items-center py-2 px-4 transition-colors hover:bg-neutral-100'}
					onClick={(): void => {
						onFocus();
						onConnect(
							'INJECTED',
							(e): void => console.error(e),
							(): void => undefined
						);
					}}>
					<div className={'mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-neutral-200'}>
						{cloneElement(detectedWalletProvider.icon, {className: 'h-6 w-6'})}
					</div>
					<b>{detectedWalletProvider.name}</b>
				</button>
				<button
					className={'group relative flex flex-row items-center py-2 px-4 transition-colors hover:bg-neutral-100'}
					onClick={(): void => {
						onFocus();
						onConnect(
							'WALLET_CONNECT',
							(e): void => console.error(e),
							(): void => undefined
						);
					}}>
					<div className={'mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-neutral-200'}>
						<IconWalletWalletConnect className={'h-6 w-6'} />
					</div>
					<b>{'WalletConnect'}</b>
				</button>
				<button
					className={'group relative flex flex-row items-center py-2 px-4 transition-colors hover:bg-neutral-100'}
					onClick={(): void => {
						onFocus();
						onConnect(
							'EMBED_GNOSIS_SAFE',
							(e): void => console.error(e),
							(): void => undefined
						);
					}}>
					<div className={'mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-neutral-200'}>
						<IconWalletGnosis className={'h-6 w-6'} />
					</div>
					<b>{'Gnosis'}</b>
				</button>
			</div>
		</div>
	);
}

function	LoginPopover(): ReactElement {
	const	{isActive, address, ens, onSwitchChain, onDesactivate} = useWeb3();
	const	[walletIdentity, set_walletIdentity] = useState<string | undefined>(undefined);
	const	[isFocused, set_isFocused] = useState(false);
	const	[isShowing, set_isShowing] = useState(false);
	const	[isInit, set_isInit] = useState(false);

	useEffect((): void => {
		set_isInit(true);
	}, []);

	useEffect((): void => {
		if (!isActive && address) {
			set_walletIdentity('Invalid Network');
		} else if (address && !ens) {
			set_walletIdentity(truncateHex(address, 6));
		} else if (address && ens) {
			set_walletIdentity(ens);
		} else if (address) {
			set_walletIdentity(truncateHex(address, 6));
		} else {
			set_walletIdentity('Connect Wallet');
		}
	}, [ens, address, isActive]);

	function onDisconnect(): void {
		performBatchedUpdates((): void => {
			set_isFocused(false);
			set_isShowing(false);
			onDesactivate();
		});
	}

	return (
		<>
			<div
				className={isShowing || isFocused ? 'fixed inset-0 z-40' : 'hidden'}
				aria-hidden={true}
				onClick={(): void => {
					performBatchedUpdates((): void => {
						set_isShowing(false);
						set_isFocused(false);
					});
				}} />

			<div className={'relative z-50'}>
				<Popover
					onMouseEnter={(): void => !isActive ? set_isShowing(true) : undefined}
					onMouseLeave={(): void => !isFocused ? set_isShowing(false) : undefined}>
					<div suppressHydrationWarning className={'yearn--header-nav-item'}>
						<Popover.Button
							onClick={(): void => {
								if (!isActive && address) {
									onSwitchChain(1, true);
								} else if (isActive) {
									onDisconnect();
								}
							}}>
							<div suppressHydrationWarning>
								{!isInit ? 'Connect wallet' : isActive ? walletIdentity : 'Connect wallet'}
							</div>
						</Popover.Button>
					</div>
					<Transition
						as={'span'}
						appear
						unmount={false}
						show={isShowing}
						enter={'transition ease-out duration-200'}
						enterFrom={'opacity-0 translate-y-1'}
						enterTo={'opacity-100 translate-y-0'}
						leave={'transition ease-in duration-200'}
						leaveFrom={'opacity-100 translate-y-0'}
						leaveTo={'opacity-0 translate-y-1'}>
						<Popover.Panel className={'absolute right-0 top-4 z-[1000] mt-3 w-screen max-w-[300px] md:-right-4 md:pt-2'}>
							{!isActive ? (
								<LoginStepWallet onFocus={(): void => set_isFocused(true)} />
							) : null}

						</Popover.Panel>
					</Transition>
				</Popover>
			</div>
		</>
	);
}


export default LoginPopover;
