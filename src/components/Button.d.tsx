import	React, {ReactElement}				from	'react';

export type	TButton = {
	children: ReactElement | string,
	as?: 'a' | 'button',
	variant?: 'filled' | 'outlined' | 'light',
	stopPropagation?: boolean
} & React.ComponentPropsWithoutRef<'button' | 'a'>

export type TMouseEvent = React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>;