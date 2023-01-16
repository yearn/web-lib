declare const ERC20_ABI: ({
    name: string;
    inputs: {
        type: string;
        name: string;
        indexed: boolean;
    }[];
    anonymous: boolean;
    type: string;
    outputs?: undefined;
    stateMutability?: undefined;
    gas?: undefined;
} | {
    outputs: never[];
    inputs: {
        type: string;
        name: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    anonymous?: undefined;
    gas?: undefined;
} | {
    name: string;
    outputs: {
        type: string;
        name: string;
    }[];
    inputs: {
        type: string;
        name: string;
    }[];
    stateMutability: string;
    type: string;
    gas: string;
    anonymous?: undefined;
})[];
export default ERC20_ABI;
