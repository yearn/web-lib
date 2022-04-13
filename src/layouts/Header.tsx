import	React, {ReactElement}				from	'react';
import	useWeb3								from	'../contexts/useWeb3';
import	{Card}								from	'../components/Card';
import	{Dropdown, TDropdownOption}			from	'../components/Dropdown';
import	{truncateHex}						from	'../utils/utils';
import	IconNetworkEthereum					from	'../icons/IconNetworkEthereum';
import	IconNetworkFantom					from	'../icons/IconNetworkFantom';
import	IconNetworkArbitrum					from	'../icons/IconNetworkArbitrum';

const	options: TDropdownOption[] = [
	{icon: <IconNetworkEthereum />, label: 'Ethereum', value: 1},
	{icon: <IconNetworkFantom />, label: 'Fantom', value: 250},
	{icon: <IconNetworkArbitrum />, label: 'Arbitrum', value: 42161}
];

type		THeader = {children: ReactElement}
function	Header({children}: THeader): ReactElement {
	const	{chainID, onSwitchChain, isActive, address, ens, openLoginModal, onDesactivate} = useWeb3();

	return (
		<header className={'z-30 py-4 mx-auto w-full max-w-6xl'}>
			<Card className={'flex justify-between items-center h-auto md:h-20'}>
				<div className={'flex flex-row items-center w-full'}>
					{children}
				</div>
				<div className={'flex flex-row items-center space-x-4'}>
					<div className={'hidden flex-row items-center space-x-4 md:flex'}>
						<Dropdown
							defaultOption={options[0]}
							options={options}
							selected={options.find((e): boolean => e.value === Number(chainID)) || options[0]}
							set_selected={(option: TDropdownOption): void => onSwitchChain(option.value as number, true)} />
					</div>
					{process.env.USE_WALLET ? (
						<button
							onClick={(): void => {
								if (isActive)
									onDesactivate();
								else
									openLoginModal();
							}}
							className={'truncate button-light'}>
							{!isActive ? 'Connect wallet' : ens ? ens : truncateHex(address || '', 4)}
						</button>
					) : null}
				</div>
			</Card>
		</header>
	);
}

export {Header};
