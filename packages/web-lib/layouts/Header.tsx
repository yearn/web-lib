import React, {ReactElement, useEffect, useState} from 'react';
import {Card} from '@yearn-finance/web-lib/components/Card';
import {Dropdown} from '@yearn-finance/web-lib/components/Dropdown';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import IconNetworkArbitrum from '@yearn-finance/web-lib/icons/IconNetworkArbitrum';
import IconNetworkEthereum from '@yearn-finance/web-lib/icons/IconNetworkEthereum';
import IconNetworkFantom from '@yearn-finance/web-lib/icons/IconNetworkFantom';
import IconNetworkOptimism from '@yearn-finance/web-lib/icons/IconNetworkOptimism';
import {truncateHex} from '@yearn-finance/web-lib/utils';

import type {TDropdownOption} from '@yearn-finance/web-lib/components/Dropdown';

const	options: TDropdownOption[] = [
	{icon: <IconNetworkEthereum />, label: 'Ethereum', value: 1},
	{icon: <IconNetworkOptimism />, label: 'Optimism', value: 10},
	{icon: <IconNetworkFantom />, label: 'Fantom', value: 250},
	{icon: <IconNetworkArbitrum />, label: 'Arbitrum', value: 42161}
];

type		THeader = {
	shouldUseWallets?: boolean,
	shouldUseNetworks?: boolean,
	children: ReactElement
}
function	Header({
	shouldUseWallets = true,
	shouldUseNetworks = true,
	children
}: THeader): ReactElement {
	const	{chainID, onSwitchChain, isActive, address, ens, openLoginModal, onDesactivate} = useWeb3();
	const	[walletIdentity, set_walletIdentity] = useState('Connect wallet');
	const	[selectedOption, set_selectedOption] = useState(options[0]);

	useEffect((): void => {
		if (!isActive) {
			set_walletIdentity('Connect wallet');
		} else if (ens) {
			set_walletIdentity(ens);
		} else if (address) {
			set_walletIdentity(truncateHex(address, 4));
		} else {
			set_walletIdentity('Connect wallet');
		}
	}, [ens, address, isActive]);

	useEffect((): void => {
		const	_selectedOption = options.find((e): boolean => e.value === Number(chainID)) || options[0];
		set_selectedOption(_selectedOption);
	}, [chainID, isActive]);

	return (
		<header className={'z-30 mx-auto w-full py-4'}>
			<Card className={'flex h-auto items-center justify-between md:h-20'}>
				<div className={'flex w-full flex-row items-center'}>
					{children}
				</div>
				<div className={'flex flex-row items-center space-x-4'}>
					{shouldUseNetworks ? (
						<div className={'hidden flex-row items-center space-x-4 md:flex'}>
							<Dropdown
								defaultOption={options[0]}
								options={options}
								selected={selectedOption}
								onSelect={(option: TDropdownOption): void => onSwitchChain(option.value as number, true)} />
						</div>
					) : null}
					{shouldUseWallets ? (
						<button
							onClick={(): void => {
								if (isActive) {
									onDesactivate();
								} else {
									openLoginModal();
								}
							}}
							data-variant={'light'}
							className={'yearn--button truncate'}>
							{walletIdentity}
						</button>
					) : null}
				</div>
			</Card>
		</header>
	);
}

export {Header};
