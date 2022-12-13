import React, {useRef} from 'react';
import {ethers} from 'ethers';
import {toSafeValue} from '@yearn-finance/web-lib/utils/format';
import {formatToNormalizedValue} from '@yearn-finance/web-lib/utils/format.bigNumber';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';

import {formatAmount} from '../utils/format.number';

import type {BigNumber} from 'ethers';
import type {ReactElement} from 'react';

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

function	InputBase(props: TInput): ReactElement {
	const	{value, onChange, onSearch, ariaLabel = 'Search', withMax, onMaxClick, className, ...rest} = props;
	const	focusRef = useRef<HTMLInputElement | null>(null);

	return (
		<form
			name={ariaLabel}
			onSubmit={(e): void => {
				e.preventDefault();
				if (onSearch) {
					onSearch(value);
				}
			}}>
			<div
				aria-label={ariaLabel}
				className={`yearn--input-field-wrapper ${className}`}>
				<span className={'sr-only'}>{ariaLabel}</span>
				<input
					ref={focusRef}
					value={value}
					onChange={(e): void => onChange(e.target.value)}
					type={props.type || 'text'}
					className={'yearn--input-field'}
					{...rest} />
				{withMax ? (
					<div
						className={'yearn--input-max'}
						onClick={(e): void => {
							e.stopPropagation();
							e.preventDefault();
							if (onMaxClick) {
								onMaxClick();
								if (focusRef.current) {
									focusRef.current.blur();
								}
							}
						}}>
						{'Max'}
					</div>
				) : null}
			</div>
		</form>
	);
}

function	InputBigNumber(props: TInputBigNumber): ReactElement {
	const {value, onSetValue, onValueChange, maxValue = ethers.constants.Zero, withMax = true, decimals = 18, balance = '', price = 0} = props;

	function	onChange(s: string): void {
		performBatchedUpdates((): void => {
			onSetValue(s);
			if (onValueChange) {
				onValueChange(s);
			}
		});
	}

	const	safeValue = toSafeValue(value);
	return (
		<label
			aria-invalid={withMax && (safeValue !== 0 && (safeValue > formatToNormalizedValue(maxValue, decimals)))}
			className={'yearn--input'}>
			<p>{`You have ${balance}`}</p>
			<Input
				value={value}
				type={'number'}
				min={0}
				onChange={(s: unknown): void => onChange(s as string)}
				onSearch={(s: unknown): void => onChange(s as string)}
				placeholder={'0.00000000'}
				max={formatToNormalizedValue(maxValue, decimals)}
				onMaxClick={(): void => {
					if (!maxValue.isZero()) {
						onChange(formatToNormalizedValue(maxValue, decimals).toString());
					}
				}}
				withMax={withMax}
				disabled={props.disabled} />
			<p>{`$ ${formatAmount(safeValue * price, 2, 2)}`}</p>
		</label>
	);
}

export const Input = Object.assign(InputBase, {BigNumber: InputBigNumber});
