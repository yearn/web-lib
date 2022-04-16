import	React, {ReactElement}				from	'react';

export type TButtonVariant = 'filled' | 'outlined' | 'light';

export type	TButton = {
	children: ReactElement | string,
	as?: 'a' | 'button',
	variant?: TButtonVariant,
	stopPropagation?: boolean
} & React.ComponentPropsWithoutRef<'button' | 'a'>

export type TMouseEvent = React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>;