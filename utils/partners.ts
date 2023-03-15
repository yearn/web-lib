import {addressZero} from '@yearn-finance/web-lib/utils/address';

export type TPartnersInfo = {
	id: string,
	originKey?: string,
	originURI?: string,
	walletType: string
}

/* 🔵 - Yearn Finance ******************************************************
** Get specific partner informations
**************************************************************************/
export function getPartner(partnerKey = ''): TPartnersInfo {
	const isLedger = partnerKey.includes('ledger');
	if (partnerKey === 'ledger-live' || isLedger) {
		return {
			id: '0x558247e365be655f9144e1a0140D793984372Ef3',
			originKey: 'ledger-live',
			originURI: partnerKey || 'https://platform.apps.ledger.com',
			walletType: 'EMBED_LEDGER'
		};
	}
	return {
		id: addressZero,
		originKey: '',
		originURI: '',
		walletType: 'NONE'
	};
}
