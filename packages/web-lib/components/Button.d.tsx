import	React, {ReactNode}		from	'react';

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