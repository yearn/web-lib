export type TPartnersInfo = {
    id: string;
    originKey?: string;
    originURI?: string;
    walletType: string;
};
export declare function getPartner(partnerKey?: string): TPartnersInfo;
