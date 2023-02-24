/* eslint-disable @typescript-eslint/naming-convention */
import type {ethers} from 'ethers';

// Maybe types are used to represent optional values
export type MaybeBoolean = boolean | undefined;
export type MaybeString = string | undefined;
export type MaybeNumber = number | undefined;
export type MaybeTAddress = TAddress | undefined;

// Dict types are used to represent objects with string/number keys
export type TDict<T> = {[key: string]: T};
export type Dict<T> = TDict<T>;
export type TNDict<T> = {[key: number]: T};
export type NDict<T> = TNDict<T>;

// VoidPromiseFunction is used to represent a function that returns a Promise<void>
export type VoidPromiseFunction = () => Promise<void>;

// TAddress is used to represent a checksummed address
export type	TAddress = '/^0x([0-9a-f][0-9a-f])*$/I'

// TMetamaskInjectedProvider is used to represent a Metamask injected provider
export type TMetamaskInjectedProvider = ethers.providers.BaseProvider & {
	send: (...args: any[]) => void;
}
