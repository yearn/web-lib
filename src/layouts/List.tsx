import React, {ReactElement} from 'react';
import {List as VirtualizedList, AutoSizer} from 'react-virtualized';
import FlipMove from 'react-flip-move';
import * as ListTypes from './List.d';

function	ListBase({children, className}: ListTypes.TList): ReactElement {
	return (
		<div className={`flex flex-col w-full ${className}`}>
			{children}
		</div>
	);
}

function	ListAnimated({children, className}: ListTypes.TList): ReactElement {
	return (
		<FlipMove
			duration={300}
			maintainContainerHeight
			easing={'ease-in-out'}
			enterAnimation={'fade'}
			leaveAnimation={'fade'}
			className={className}>
			{children}
		</FlipMove>
	);
}

function	ListVirtualized({elements, listHeight, rowHeight, rowRenderer}: ListTypes.TListVirtualized): ReactElement {
	return (
		<div className={'flex h-full'}>
			<div className={'flex-1'}>
				<AutoSizer>
					{({width, height}: {width: number, height: number}): ReactElement => {
						return <VirtualizedList
							width={width}
							height={listHeight || height}
							rowHeight={rowHeight}
							rowCount={elements.length}
							rowRenderer={rowRenderer} />;
					}}
				</AutoSizer>
			</div>
		</div>
	);
}

export const List = Object.assign(ListBase, {
	Animated: ListAnimated,
	Virtualized: ListVirtualized
});