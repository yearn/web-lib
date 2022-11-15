import React, {forwardRef, ReactElement, ReactNode} from 'react';
import IconLoader from '@yearn-finance/web-lib/icons/IconLoader';

export type TButtonVariant = 'filled' | 'outlined' | 'light' | 'inherit';

export type	TButton = {
	children: ReactNode,
	as?: 'a' | 'button',
	variant?: TButtonVariant,
	shouldStopPropagation?: boolean,
	isBusy?: boolean,
	isDisabled?: boolean,
} & React.ComponentPropsWithoutRef<'button' | 'a'>

export type TMouseEvent = React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>;

// eslint-disable-next-line react/display-name
const Button = forwardRef((props: TButton): ReactElement => {
	const	{children, variant = 'filled', shouldStopPropagation = false, isBusy = false, isDisabled = false, ...rest} = props;

	if (rest.as === 'a') {
		return (
			<a tabIndex={-1} {...rest as React.ComponentPropsWithoutRef<'a'>}>
				<button
					data-variant={variant}
					className={`yearn--button flex-center ${rest.className}`}>
					{children}
				</button>
			</a>
		);	
	}
	return (
		<button
			{...(rest as React.ComponentPropsWithoutRef<'button'>)}
			data-variant={variant}
			className={`yearn--button ${rest.className}`}
			aria-busy={isBusy}
			disabled={isDisabled || (rest as React.ComponentPropsWithoutRef<'button'>).disabled}
			onClick={(event: TMouseEvent): void => {
				if (shouldStopPropagation) {
					event.stopPropagation();
				}
				if (!isBusy && rest.onClick) {
					rest.onClick(event);
				}
			}}>
			{children}
			{isBusy ? (
				<div className={'absolute inset-0 flex items-center justify-center'}>
					<IconLoader className={'text-neutral-0 h-6 w-6 animate-spin'} />
				</div>
			) : null}
		</button>
	);
});

export {Button};
