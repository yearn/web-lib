import {ReactElement} from 'react';

export type TCard = {
	className?: string;
	variant?: 'surface' | 'background';
	isNarrow?: boolean;
	hasNoPadding?: boolean;
	onClick?: React.MouseEventHandler;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'section'>;

export type TCardList = {
	className?: string;
	children?: React.ReactNode;
};

type RowRendererParams = {
	index: number,
	isScrolling: boolean,
	isVisible: boolean,
	key: string,
	parent: Object,
	style: Object,
};
export type TCardVirtualizedList = {
	elements: any[];
	listHeight?: number;
	rowHeight: number;
	rowRenderer: (params: RowRendererParams) => ReactElement;
};

export type TCardDetailSummary = {
	startChildren?: React.ReactNode;
	endChildren?: React.ReactNode;
	open?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export type TCardWithTabsOption = {
	label: string;
	children?: ReactElement;
}
  
export type TCardWithTabs = {
	tabs: TCardWithTabsOption[];
}

export type TCardDetail = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	summary?: TCardDetailSummary | ReactElement | ((p: unknown) => ReactElement | TCardDetailSummary) | any;
	variant?: 'surface' | 'background';
	isSticky?: boolean;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;
