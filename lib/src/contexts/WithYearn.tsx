import	React, {ReactElement}		from	'react';
import	{ethers}					from	'ethers';
import	{Web3ReactProvider}			from	'@web3-react/core';
import	{BalancesContextApp}		from	'./useBalances';
import	{UIContextApp}				from	'./useUI';
import	{PricesContextApp}			from	'./usePrices';
import	{Web3ContextApp}			from	'./useWeb3';
import	type {TUIOptions}			from	'./useUI.d';
import	type {TWeb3Options}			from	'./useWeb3.d';

const getLibrary = (provider: ethers.providers.ExternalProvider): ethers.providers.Web3Provider => {
	return new ethers.providers.Web3Provider(provider, 'any');
};

function	WithYearn({children, options}: {
	children: ReactElement
	options?: {
		ui?: TUIOptions,
		web3?: TWeb3Options
	}
}): ReactElement {
	return (
		<UIContextApp options={options?.ui}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ContextApp options={options?.web3}>
					<BalancesContextApp>
						<PricesContextApp>
							{children}
						</PricesContextApp>
					</BalancesContextApp>
				</Web3ContextApp>
			</Web3ReactProvider>
		</UIContextApp>
	);
}

export {WithYearn};
