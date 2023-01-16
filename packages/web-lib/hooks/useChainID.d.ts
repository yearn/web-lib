export type TUseChainIDRes = {
    chainID: number;
    updateChainID: (n: number) => void;
    safeChainID: number;
};
export declare function useChainID(defaultChainID?: number): TUseChainIDRes;
