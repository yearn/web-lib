type TWatchAssetOptions = {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
};
export declare function useAddToken(): (options: TWatchAssetOptions) => void;
export {};
