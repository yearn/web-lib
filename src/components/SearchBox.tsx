import React, {ReactElement} from 'react';
import {Card} from './Card';
import IconSearch from '../icons/IconSearch';

type 		TSearchBox = {
	searchTerm: string,
	set_searchTerm: React.Dispatch<React.SetStateAction<string>>
	isNarrow?: boolean,
	backgroundColor?: string,
}
function	SearchBox({
	searchTerm,
	set_searchTerm,
	isNarrow,
	backgroundColor = 'transparent'
}: TSearchBox): ReactElement {
	return (
		<Card hasNoPadding>
			<label
				className={`flex flex-row items-center w-full ${isNarrow ? 'h-10 p-2' : 'h-14 p-4'} text-typo-secondary rounded-lg border-2 border-surface focus-within:border-primary transition-colors ${backgroundColor}`}>
				<IconSearch className={isNarrow ? 'w-4 h-4 mr-2' : 'w-6 h-6 mr-4'} />
				<input
					value={searchTerm}
					onChange={(e): void => set_searchTerm(e.target.value)}
					type={'text'}
					className={`p-0 w-full bg-transparent border-none focus:border-none outline-none focus:outline-none focus:ring-0 ${isNarrow ? 'h-10' : 'h-14'}`}
					placeholder={'Search'} />
			</label>
		</Card>
	);
}

export {SearchBox};