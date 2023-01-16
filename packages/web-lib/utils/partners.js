import { ethers } from 'ethers';
export function getPartner(partnerKey = '') {
    const isLedger = partnerKey.includes('ledger');
    if (partnerKey === 'ledger-live' || isLedger) {
        return ({
            id: '0x558247e365be655f9144e1a0140D793984372Ef3',
            originKey: 'ledger-live',
            originURI: partnerKey || 'https://platform.apps.ledger.com',
            walletType: 'EMBED_LEDGER'
        });
    }
    return ({
        id: ethers.constants.AddressZero,
        originKey: '',
        originURI: '',
        walletType: 'NONE'
    });
}
