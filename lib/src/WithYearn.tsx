import	React, {ReactElement}		from	'react';
import	{ethers}					from	'ethers';
import	{Web3ReactProvider}			from	'@web3-react/core';
import	{BalancesContextApp}		from	'./contexts/useBalances';
import	{UIContextApp}				from	'./contexts/useUI';
import	{PricesContextApp}			from	'./contexts/usePrices';
import	{Web3ContextApp}			from	'./contexts/useWeb3';

const getLibrary = (provider: ethers.providers.ExternalProvider): ethers.providers.Web3Provider => {
	return new ethers.providers.Web3Provider(provider, 'any');
};

function	WithYearn({children}: {children: ReactElement}): ReactElement {
	return (
		<UIContextApp>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ContextApp>
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
