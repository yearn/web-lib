import	React, {ReactElement}	from	'react';
import type * as ButtonTypes	from	'./Button.d';

const Button = React.forwardRef(({
	children,
	variant = 'filled',
	as = 'button',
	...props
}: ButtonTypes.TButton, _): ReactElement => {
	const	filledClassName = 'button-filled';
	const	outlinedClassName = 'button-outline';
	const	lightClassName = 'button-light';
	const	buttonClassName = variant === 'filled' ? filledClassName : variant === 'outlined' ? outlinedClassName : lightClassName;

	if (as === 'a') {
		return (
			<a
				{...props as React.ComponentPropsWithoutRef<'a'>}
				className={`button flex-center ${buttonClassName} ${props.className}`}>
				{children}
			</a>
		);	
	}
	return (
		<button
			{...props as React.ComponentPropsWithoutRef<'button'>}
			className={`${buttonClassName} ${props.className}`}
			onClick={(event: ButtonTypes.TMouseEvent): void => {
				if (props.stopPropagation) {
					event.stopPropagation();
				}
				if (props.onClick) {
					props.onClick(event);
				}
			}}>
			{children}
		</button>
	);
});

export {Button};
