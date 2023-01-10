import React, {useMemo} from 'react';
import IconWalletCoinbase from '@yearn-finance/web-lib/icons/IconWalletCoinbase';
import IconWalletFrame from '@yearn-finance/web-lib/icons/IconWalletFrame';
import IconWalletMetamask from '@yearn-finance/web-lib/icons/IconWalletMetamask';
import IconWalletTrustWallet from '@yearn-finance/web-lib/icons/IconWalletTrustWallet';

import type {ReactElement} from 'react';

export type TWalletProvider = {
	isFrame?: boolean,
	isCoinbaseWallet?: boolean,
	isCoinbaseBrowser?: boolean, //coinbase wallet for mobile
	isMetaMask?: boolean,
	isTrustWallet?: boolean,
	isTrust?: boolean, //trustWallet for mobile
}

export type TInjectedWallet = {
	name: string;
	icon: ReactElement;
	type: (
		'NONE' |
		'INJECTED' |
		'INJECTED_COINBASE' |
		'WALLET_CONNECT' |
		'EMBED_LEDGER' |
		'EMBED_GNOSIS_SAFE' |
		'EMBED_COINBASE' |
		'EMBED_TRUSTWALLET'
	);
}

/* 🔵 - Yearn Finance ******************************************************
** This hook can be used to grab the current injected wallet provider.
** It will return the name and icon of the wallet provider.
**************************************************************************/
export function useInjectedWallet(): TInjectedWallet {

	const	detectedWalletProvider = useMemo((): TInjectedWallet => {
		if (typeof(window) !== 'undefined') {
			const	ethereum = (window?.ethereum as TWalletProvider);
			if (ethereum?.isCoinbaseBrowser) {
				return ({
					name: 'Coinbase',
					icon: <IconWalletCoinbase />,
					type: 'EMBED_COINBASE'
				});
			}
			if (ethereum?.isCoinbaseWallet) {
				return ({
					name: 'Coinbase',
					icon: <IconWalletCoinbase />,
					type: 'INJECTED'
				});
			}
			if (ethereum?.isFrame) {
				return ({
					name: 'Frame',
					icon: <IconWalletFrame />,
					type: 'INJECTED'
				});
			}
			if (ethereum?.isMetaMask) {
				return ({
					name: 'Metamask',
					icon: <IconWalletMetamask />,
					type: 'INJECTED'
				});
			}
			if (ethereum?.isTrustWallet) {
				return ({
					name: 'TrustWallet',
					icon: <IconWalletTrustWallet />,
					type: 'INJECTED'
				});
			}
			if (ethereum?.isTrust) {
				return ({
					name: 'TrustWallet',
					icon: <IconWalletTrustWallet />,
					type: 'EMBED_TRUSTWALLET'
				});
			}
		}

		//Non supported yet:
		// if (ethereum?.isAvalanche) 'Core Wallet'
		// if (ethereum?.isBitKeep) 'BitKeep'
		// if (ethereum?.isBraveWallet) 'Brave Wallet'
		// if (ethereum?.isExodus) 'Exodus'
		// if (ethereum?.isKuCoinWallet) 'KuCoin Wallet'
		// if (ethereum?.isMathWallet) 'MathWallet'
		// if (ethereum?.isOneInchIOSWallet || ethereum?.isOneInchAndroidWallet) '1inch Wallet'
		// if (ethereum?.isOpera) 'Opera'
		// if (ethereum?.isPortal) 'Ripio Portal'
		// if (ethereum?.isTally) 'Tally'
		// if (ethereum?.isTokenPocket) 'TokenPocket'
		// if (ethereum?.isTokenary) 'Tokenary'

		return ({
			name: 'frame',
			icon: <IconWalletFrame className={'text-neutral-900'} />,
			type: 'INJECTED'
		});
	}, [typeof(window)]); // eslint-disable-line react-hooks/exhaustive-deps

	return (detectedWalletProvider);
}
