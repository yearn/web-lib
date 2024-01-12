import type {ReactElement} from 'react';
import type {multicall} from '@wagmi/core';
import type {TSolver} from '../utils/schemas/yDaemonTokenListBalances';

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
export type TAddressWagmi = `0x${string}`;
export type TAddress = TAddressWagmi;
export type TAddressLike = TAddressYearn | TAddressWagmi | string;

export type TDropdownOption = {
	label: string;
	symbol: string;
	decimals: number;
	chainID: number;
	value: TAddress;
	icon?: ReactElement;
	zapVia?: TAddress;
	solveVia?: TSolver[];
	settings?: {
		shouldNotBeWithdrawTarget?: boolean;
		shouldHideIfZero?: boolean;
	};
};

export type TDropdownProps = {
	options: TDropdownOption[];
	defaultOption: TDropdownOption;
	selected?: TDropdownOption;
	placeholder?: string;
	className?: string;
	comboboxOptionsClassName?: string;
	onSelect: React.Dispatch<React.SetStateAction<TDropdownOption>> | ((option: TDropdownOption) => void);
};

export type TDropdownItemProps = {
	option: TDropdownOption;
};

export type TDropdownGaugeOption = {
	label: string;
	icon?: ReactElement;
	value: {
		name: string;
		tokenAddress: TAddress;
		poolAddress: TAddress;
		gaugeAddress: TAddress;
		APY: number;
	};
};
export type TDropdownGaugeProps = {
	options: TDropdownGaugeOption[];
	selected?: TDropdownGaugeOption;
	placeholder?: string;
	onSelect: React.Dispatch<React.SetStateAction<TDropdownGaugeOption>> | ((option: TDropdownGaugeOption) => void);
};

export type TDropdownGaugeItemProps = {
	option: TDropdownGaugeOption;
};

export type TNormalizedBN = {
	raw: bigint;
	normalized: number | string;
};

export type TToken = {
	address: TAddress;
	name: string;
	symbol: string;
	decimals: number;
	chainID: number;
	logoURI?: string;
	value: number;
	stakingValue: number;
	price: TNormalizedBN;
	balance: TNormalizedBN;
};
export type TChainTokens = TNDict<TDict<TToken>>;

export type TGraphData = {
	name: string;
	value: number;
};

export type TMessariGraphData = {
	name: string;
	tvl: number;
	pps: number;
};

export type TSortDirection = 'asc' | 'desc' | '';

export type TMulticallContract = Parameters<typeof multicall>[0]['contracts'][0];
