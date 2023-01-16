declare const ZAP_ETH_TO_YVETH_ABI: ({
    stateMutability: string;
    type: string;
    inputs: {
        name: string;
        type: string;
    }[];
    outputs: never[];
    name?: undefined;
} | {
    stateMutability: string;
    type: string;
    name: string;
    inputs: {
        name: string;
        type: string;
    }[];
    outputs: never[];
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    outputs?: undefined;
    name?: undefined;
})[];
export default ZAP_ETH_TO_YVETH_ABI;
