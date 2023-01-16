export type TAddress = '/^0x([0-9a-f][0-9a-f])*$/I';
export declare function toAddress(address?: string): TAddress;
export declare function toENS(address: string | undefined, format?: boolean, size?: number): string;
export declare function isZeroAddress(address?: string): boolean;
export declare function truncateHex(address: string | undefined, size: number): string;
export declare function allowanceKey(token: unknown, spender: unknown): string;
