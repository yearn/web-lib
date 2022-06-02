import React, {ReactElement} from 'react';
import {AutoSizer as VirtualizedAutoSizer} from 'react-virtualized';
import type * as AutoSizerTypes from './Autosizer.d';

function	Autosizer({children}: AutoSizerTypes.TAutosizer): ReactElement {
	return (
		<div className={'flex h-full'}>
			<div className={'flex-1'}>
				<VirtualizedAutoSizer>
					{({width, height}: {width: number, height: number}): ReactElement => (
						<div style={{width, height}}>
							{children}
						</div>
					)}
				</VirtualizedAutoSizer>
			</div>
		</div>
	);
}

export {Autosizer};