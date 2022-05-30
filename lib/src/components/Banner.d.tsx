import	React, {ReactElement, ReactNode}	from	'react';

export type TBanner = {
	title?: string,
	image?: ReactNode,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactNode,
	canClose?: boolean,
	onClose?: () => void,
	onClick?: React.MouseEventHandler
	variant?: 'default' | 'image' | 'split' | 'background'
	height?: string | number,
	className?: string
}
export type TDefaultVariant = {
	title?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactNode
}

export type	TBannerPagination = {
	children: ReactElement[],
	canClose?: boolean,
	paginationStyle?: string,
	onClose?: () => void
}
