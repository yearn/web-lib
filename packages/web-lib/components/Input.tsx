import	React, {MutableRefObject, ReactElement}		from	'react';
import	{BigNumber, ethers}							from	'ethers';
import	{toSafeValue, toNormalizedValue, amount}	from	'../utils/format';
import	performBatchedUpdates						from	'../utils/performBatchedUpdates';

type 		TInput = {
	value: string | number,
	onChange: (s: string | number) => void
	onSearch?: (s: string | number) => void
	ariaLabel?: string
	withMax?: boolean
	onMaxClick?: () => void
} & React.ComponentPropsWithoutRef<'input'>
function	InputBase({
	value,
	onChange,
	onSearch,
	ariaLabel = 'Search',
	withMax,
	onMaxClick,
	className,
	...props
}: TInput): ReactElement {
	const	focusRef = React.useRef<MutableRefObject<HTMLInputElement | undefined> | any>();
	return (
		<form
			name={ariaLabel}
			onSubmit={(e): void => {
				e.preventDefault();
				if (onSearch)
					onSearch(value);
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
					{...props} />
				{withMax ? <div
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
				</div> : null}
			</div>
		</form>
	);
}

type		TInputBigNumber = {
	value: string,
	onSetValue: (s: string) => void,
	onValueChange?: (s: string) => void,
	maxValue?: BigNumber,
	withMax?: boolean,
	decimals?: number,
	balance?: string,
	price?: number,
} & React.InputHTMLAttributes<HTMLInputElement>;

function	InputBigNumber({
	value,
	onSetValue,
	onValueChange,
	maxValue = ethers.constants.Zero,
	withMax = true,
	decimals = 18,
	balance = '',
	price = 0,
	...props
}: TInputBigNumber): ReactElement {
	function	onChange(s: string): void {
		performBatchedUpdates((): void => {
			onSetValue(s);
			if (onValueChange)
				onValueChange(s);
		});
	}

	const	safeValue = toSafeValue(value);
	return (
		<label
			aria-invalid={withMax && (safeValue !== 0 && (safeValue > toNormalizedValue(maxValue, decimals)))}
			className={'yearn--input'}>
			<p>{`You have ${balance}`}</p>
			<Input
				value={value}
				type={'number'}
				min={0}
				onChange={(s: unknown): void => onChange(s as string)}
				onSearch={(s: unknown): void => onChange(s as string)}
				placeholder={'0.00000000'}
				max={toNormalizedValue(maxValue, decimals)}
				onMaxClick={(): void => {
					if (!maxValue.isZero())
						onChange(toNormalizedValue(maxValue, decimals).toString());
				}}
				withMax={withMax}
				disabled={props.disabled} />
			<p>{`$ ${amount(safeValue * price, 2, 2)}`}</p>
		</label>
	);
}

export const Input = Object.assign(InputBase, {BigNumber: InputBigNumber});
