'use client';

import React, {MutableRefObject, ReactElement, useRef} from 'react';
import {ethers} from 'ethers';
import {format, performBatchedUpdates} from '@yearn-finance/web-lib/utils';

import type {TInput, TInputBigNumber} from './Input.d';

function	InputBase(props: TInput): ReactElement {
	const	{value, onChange, onSearch, ariaLabel = 'Search', withMax, onMaxClick, className, ...rest} = props;
	const	focusRef = useRef<MutableRefObject<HTMLInputElement | undefined> | any>();

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
									(focusRef.current as unknown as HTMLInputElement).blur();
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

	const	safeValue = format.toSafeValue(value);
	return (
		<label
			aria-invalid={withMax && (safeValue !== 0 && (safeValue > format.toNormalizedValue(maxValue, decimals)))}
			className={'yearn--input'}>
			<p>{`You have ${balance}`}</p>
			<Input
				value={value}
				type={'number'}
				min={0}
				onChange={(s: unknown): void => onChange(s as string)}
				onSearch={(s: unknown): void => onChange(s as string)}
				placeholder={'0.00000000'}
				max={format.toNormalizedValue(maxValue, decimals)}
				onMaxClick={(): void => {
					if (!maxValue.isZero()) {
						onChange(format.toNormalizedValue(maxValue, decimals).toString());
					}
				}}
				withMax={withMax}
				disabled={props.disabled} />
			<p>{`$ ${format.amount(safeValue * price, 2, 2)}`}</p>
		</label>
	);
}

export const Input = Object.assign(InputBase, {BigNumber: InputBigNumber});
