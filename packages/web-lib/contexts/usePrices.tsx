import React, {ReactElement, createContext} from 'react';
import {ethers} from 'ethers';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import {units as formatUnits} from '../utils/format';
import {getProvider} from '../utils/providers';
import {useSettings} from '../contexts/useSettings';

import type * as usePricesTypes from './usePrices.d';
import useWeb3 from './useWeb3';

async function	getTriCryptoPrice(provider: ethers.providers.Provider): Promise<string> {
	const	TRI_CRYPTO_LP_TOKEN_ADDR = '0xcA3d75aC011BF5aD07a98d02f18225F9bD9A6BDF';
	const	UTILS_TRI_CRYPTO_LENS_ADDR = '0x83d95e0D5f402511dB06817Aff3f9eA88224B030';
	const	contract = new ethers.Contract(
		UTILS_TRI_CRYPTO_LENS_ADDR,
		['function getNormalizedValueUsdc(address, uint256) public view returns (uint256)'],
		provider
	);
	const priceUSDC = await contract.getNormalizedValueUsdc(
		TRI_CRYPTO_LP_TOKEN_ADDR,
		'1000000000000000000'
	);
	const triCryptoPrice = formatUnits(priceUSDC, 6);
	return triCryptoPrice;
}

const	PricesContext = createContext<usePricesTypes.TPricesContext>({prices: {}});
export const PricesContextApp = ({children}: {children: ReactElement}): React.ReactElement => {
	const	{networks} = useSettings();
	const	{chainID} = useWeb3();
	const	[nonce, set_nonce] = React.useState(0);
	const	[prices, set_prices] = useLocalStorage('prices', {}) as [
		usePricesTypes.TPriceElement,
		(prices: usePricesTypes.TPriceElement) => void
	];

	/**************************************************************************
	**	Fetch the prices of the list of CG_TOKENS
	**************************************************************************/
	React.useEffect((): void => {
		if (process.env.USE_PRICES) {
			axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${process.env.CG_IDS}&vs_currencies=usd,eth`).then(({data}): void => {
				set_prices(data);
				set_nonce(nonce + 1);

				if (process.env.USE_PRICES_TRI_CRYPTO) {
					const	provider = getProvider(chainID || 1);
					getTriCryptoPrice(provider).then((price: string): void => {
						data.triCrypto = {usd: Number(price)};
						data.crypto = {usd: Number(price)};
						data['3crypto'] = {usd: Number(price)};
						set_prices(data);
						set_nonce((n: number): number => n + 1);
					});
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainID, networks]);

	return (
		<PricesContext.Provider value={{prices}}>
			{children}
		</PricesContext.Provider>
	);
};

export const usePrices = (): usePricesTypes.TPricesContext => React.useContext(PricesContext);
export default usePrices;
