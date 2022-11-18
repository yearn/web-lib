import {ethers} from 'ethers';

export type TDict<T> = {
    [key: string]: T
}

export type TMetamaskInjectedProvider = ethers.providers.BaseProvider & {
    send: (...args: any[]) => void;
}
