import React, {forwardRef} from 'react';
import Childable from '@yearn-finance/web-lib/components/Childable';
import IconLoader from '@yearn-finance/web-lib/icons/IconLoader';

import type {ForwardedRef, ReactElement, ReactNode} from 'react';

export type TButtonVariant = 'filled' | 'outlined' | 'light' | 'inherit' | string;

export type	TButton = {
	children: ReactNode,
	as?: 'a' | 'button',
	variant?: TButtonVariant,
	shouldStopPropagation?: boolean,
	isBusy?: boolean,
	isDisabled?: boolean,
} & React.ComponentPropsWithoutRef<'button'>

export type TMouseEvent = React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>;

// eslint-disable-next-line react/display-name
const Button = forwardRef((props: TButton, ref: ForwardedRef<HTMLButtonElement | null>): ReactElement => {
	const	{children, variant = 'filled', shouldStopPropagation = false, isBusy = false, isDisabled = false, ...rest} = props;

	return (
		<button
			{...(rest as React.ComponentPropsWithoutRef<'button'>)}
			ref={ref}
			data-variant={variant}
			className={`yearn--button ${rest.className}`}
			aria-busy={isBusy}
			disabled={isDisabled || rest.disabled}
			onClick={(event: TMouseEvent): void => {
				if (shouldStopPropagation) {
					event.stopPropagation();
				}
				if (!isBusy && rest.onClick) {
					rest.onClick(event);
				}
			}}>
			{children}
			<Childable shouldRender={isBusy}>
				<div className={'absolute inset-0 flex items-center justify-center'}>
					<IconLoader className={'text-neutral-0 h-6 w-6 animate-spin'} />
				</div>
			</Childable>
		</button>
	);
});

export {Button};
