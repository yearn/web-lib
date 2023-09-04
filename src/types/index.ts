/* eslint-disable @typescript-eslint/naming-convention */

// Maybe types are used to represent optional values
export type Maybe<T> = T | undefined;

// Dict types are used to represent objects with string/number keys
export type TDict<T> = {[key: string]: T};
export type Dict<T> = TDict<T>;
export type TNDict<T> = {[key: number]: T};
export type NDict<T> = TNDict<T>;

// VoidPromiseFunction is used to represent a function that returns a Promise<void>
export type VoidPromiseFunction = () => Promise<void>;

// TAddress is used to represent a checksummed address
export type TAddressYearn = '/^0x[0-9a-f]{40}$/i';
export type	TAddressWagmi = `0x${string}`
export type TAddress = TAddressWagmi;
export type TAddressLike = TAddressYearn | TAddressWagmi | string;
