import {ReactElement} from 'react';

export type TList = {
	className?: string;
	children?: ReactElement;
};

type TRowRendererParams = {
	index: number,
	isScrolling: boolean,
	isVisible: boolean,
	key: string,
	parent: unknown,
	style: unknown,
};
export type TListVirtualized = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	elements: any[];
	listHeight?: number;
	rowHeight: number;
	rowRenderer: (params: TRowRendererParams) => ReactElement;
};