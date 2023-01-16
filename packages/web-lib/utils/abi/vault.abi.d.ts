declare const VAULT_ABI: ({
    name: string;
    inputs: {
        name: string;
        type: string;
        indexed: boolean;
    }[];
    anonymous: boolean;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
    gas?: undefined;
} | {
    stateMutability: string;
    type: string;
    name: string;
    inputs: {
        name: string;
        type: string;
    }[];
    outputs: {
        name: string;
        type: string;
    }[];
    gas: string;
    anonymous?: undefined;
} | {
    stateMutability: string;
    type: string;
    name: string;
    inputs: {
        name: string;
        type: string;
    }[];
    outputs: {
        name: string;
        type: string;
    }[];
    anonymous?: undefined;
    gas?: undefined;
})[];
export default VAULT_ABI;
