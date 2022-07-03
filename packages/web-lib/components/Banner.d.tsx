import	React, {ReactElement, ReactNode}	from	'react';

export type TBanner = {
	title: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children: ReactNode,
} & React.ComponentPropsWithoutRef<'div'>

export type TDefaultVariant = {
	title?: string,
	primaryButton?: ReactElement,
	secondaryButton?: ReactElement,
	children?: ReactNode
}

export type	TBannerPagination = {
	children: ReactElement[],
	canClose?: boolean,
	onClose?: () => void
}
