import	React, {ReactElement}	from	'react';
import	IconLoader				from	'../icons/IconLoader';
import type * as ButtonTypes	from	'./Button.d';

const Button = React.forwardRef(({
	children,
	variant = 'inherit',
	as = 'button',
	className,
	shouldStopPropagation = false,
	isBusy = false,
	isDisabled = false,
	...props
}: ButtonTypes.TButton, _): ReactElement => {
	if (as === 'a') {
		return (
			<a tabIndex={-1} {...props as React.ComponentPropsWithoutRef<'a'>}>
				<button
					data-variant={variant}
					className={`yearn--button flex-center ${className}`}>
					{children}
				</button>
			</a>
		);	
	}
	return (
		<button
			{...(props as React.ComponentPropsWithoutRef<'button'>)}
			data-variant={variant}
			className={`yearn--button ${className}`}
			aria-busy={isBusy}
			disabled={isDisabled || (props as React.ComponentPropsWithoutRef<'button'>).disabled}
			onClick={(event: ButtonTypes.TMouseEvent): void => {
				if (shouldStopPropagation) {
					event.stopPropagation();
				}
				if (!isBusy && props.onClick) {
					props.onClick(event);
				}
			}}>
			{children}
			{isBusy ? <div className={'flex absolute inset-0 justify-center items-center'}>
				<IconLoader className={'w-6 h-6 text-white animate-spin'} />
			</div> : null}
		</button>
	);
});

export {Button};
