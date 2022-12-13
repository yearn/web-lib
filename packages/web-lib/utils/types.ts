import type {ethers} from 'ethers';

export type TDict<T> = {
    [key: string]: T
}
export type TNDict<T> = {
    [key: number]: T
}

export type TMetamaskInjectedProvider = ethers.providers.BaseProvider & {
    send: (...args: any[]) => void;
}
