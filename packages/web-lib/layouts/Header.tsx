import	React, {ReactElement}				from	'react';
import	useWeb3								from	'../contexts/useWeb3';
import	{Card}								from	'../components/Card';
import	{Dropdown}							from	'../components/Dropdown';
import	{TDropdownOption}					from	'../components/Dropdown.d';
import	{truncateHex}						from	'../utils/utils';
import	IconNetworkEthereum					from	'../icons/IconNetworkEthereum';
import	IconNetworkFantom					from	'../icons/IconNetworkFantom';
import	IconNetworkArbitrum					from	'../icons/IconNetworkArbitrum';
import	IconNetworkOptimism					from	'../icons/IconNetworkOptimism';

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
	const	[walletIdentity, set_walletIdentity] = React.useState('Connect wallet');
	const	[selectedOption, set_selectedOption] = React.useState(options[0]);

	React.useEffect((): void => {
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

	React.useEffect((): void => {
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
								if (isActive)
									onDesactivate();
								else
									openLoginModal();
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
