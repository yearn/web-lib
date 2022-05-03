import	React, {ReactElement}	from	'react';

export type TBanner = {
	title?: string,
	image?: string | ReactElement,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactElement | ReactElement[],
	canClose?: boolean,
	onClose?: () => void,
	onClick?: React.MouseEventHandler
	variant?: 'default' | 'image' | 'split' | 'background'
	height?: string | number,
	className?: string,
	withControls?: boolean
}
export type TDefaultVariant = {
	title?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactElement | ReactElement[],
	variant?: 'default' | 'image' | 'split' | 'background',
	withControls?: boolean
}

export type	TBannerPagination = {
	children: ReactElement[],
	canClose?: boolean,
	paginationStyle?: string,
	onClose?: () => void
}
