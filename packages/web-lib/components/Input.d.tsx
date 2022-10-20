import {BigNumber} from 'ethers';

export type	TInput = {
	value: string | number,
	onChange: (s: string | number) => void
	onSearch?: (s: string | number) => void
	ariaLabel?: string
	withMax?: boolean
	onMaxClick?: () => void
} & React.ComponentPropsWithoutRef<'input'>

export type	TInputBigNumber = {
	value: string,
	onSetValue: (s: string) => void,
	onValueChange?: (s: string) => void,
	maxValue?: BigNumber,
	withMax?: boolean,
	decimals?: number,
	balance?: string,
	price?: number,
} & React.InputHTMLAttributes<HTMLInputElement>;