/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type {TWeb3Provider} from '@yearn-finance/web-lib/contexts/types';

// Maybe types are used to represent optional values
export type Maybe<T> = T | undefined;
export type MayPromise<T> = Promise<T | undefined>;

// Dict types are used to represent objects with string/number keys
export type TDict<T> = {[key: string]: Maybe<T>};
export type TNDict<T> = {[key: number]: Maybe<T>};

// VoidPromiseFunction is used to represent a function that returns a Promise<void>
export type VoidPromiseFunction = () => Promise<void>;

// UnknownPromiseFunction is used to represent a function that returns a Promise<void>
export type UnknownPromiseFunction = () => Promise<unknown>;

// TAddress is used to represent a checksummed address
export type	TAddress = '/^0x([0-9a-f][0-9a-f])*$/I'

// TMetamaskInjectedProvider is used to represent a Metamask injected provider
export type TMetamaskInjectedProvider = TWeb3Provider & {
	send: (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

//Mapping for the old bignumber from ethers to the new ones.
export type TBigInt = bigint;
export type TBigNumberish = string | number | bigint | bigint;
export type	TNormalizedBN = {
	raw: bigint,
	normalized: number | string,
}
