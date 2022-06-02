import	{ethers}	from	'ethers';

export type TPartnersInfo = {
	id: string,
	originKey?: string,
	originURI?: string,
	walletType: number
}

/* 🔵 - Yearn Finance ******************************************************
** Get specific partner informations
**************************************************************************/
export function getPartner(partnerKey: string): TPartnersInfo {
	if (partnerKey === 'ledger-live') {
		return ({
			id: '0x558247e365be655f9144e1a0140D793984372Ef3',
			originKey: 'ledger-live',
			originURI: 'https://platform.apps.ledger.com',
			walletType: 2
		});
	}
	return ({
		id: ethers.constants.AddressZero,
		originKey: '',
		originURI: '',
		walletType: -1
	});
}
