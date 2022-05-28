import	React, {ReactElement}				from	'react';
import	useWeb3								from	'../contexts/useWeb3';
import	{Card}								from	'../components/Card';
import	{Dropdown}							from	'../components/Dropdown';
import	{TDropdownOption}					from	'../components/Dropdown.d';
import	{truncateHex}						from	'../utils/utils';
import	IconNetworkEthereum					from	'../icons/IconNetworkEthereum';
import	IconNetworkFantom					from	'../icons/IconNetworkFantom';
import	IconNetworkArbitrum					from	'../icons/IconNetworkArbitrum';

const	options: TDropdownOption[] = [
	{icon: <IconNetworkEthereum />, label: 'Ethereum', value: 1},
	{icon: <IconNetworkFantom />, label: 'Fantom', value: 250},
	{icon: <IconNetworkArbitrum />, label: 'Arbitrum', value: 42161}
];

type		THeader = {
	shouldUseWallets?: boolean,
	shouldUseNetworks?: boolean,
	children: ReactElement
}
function	Header({
	shouldUseWallets = process.env.USE_WALLET as unknown as boolean,
	shouldUseNetworks = process.env.USE_NETWORKS as unknown as boolean,
	children
}: THeader): ReactElement {
	const	{chainID, onSwitchChain, isActive, address, ens, openLoginModal, onDesactivate} = useWeb3();
	const	[walletIdentity, set_walletIdentity] = React.useState('Connect wallet');

	React.useEffect(() => {
		if (!isActive) {
			set_walletIdentity('Connect wallet');
		} else if (ens) {
			set_walletIdentity(ens);
		} else if (address) {
			set_walletIdentity(truncateHex(address, 4));
		} else {
			set_walletIdentity('Connect wallet');
		}
	}, [ens, address, isActive])

	return (
		<header className={'z-30 py-4 mx-auto w-full'}>
			<Card className={'flex justify-between items-center h-auto md:h-20'}>
				<div className={'flex flex-row items-center w-full'}>
					{children}
				</div>
				<div className={'flex flex-row items-center space-x-4'}>
					{shouldUseNetworks ? (
						<div className={'hidden flex-row items-center space-x-4 md:flex'}>
							<Dropdown
								defaultOption={options[0]}
								options={options}
								selected={options.find((e): boolean => e.value === Number(chainID)) || options[0]}
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
							property={'theme.light'}
							className={'truncate yearn--button'}>
							{walletIdentity}
						</button>
					) : null}
				</div>
			</Card>
		</header>
	);
}

export {Header};
