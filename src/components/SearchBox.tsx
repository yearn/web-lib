import React, {ReactElement} from 'react';
import {Card} from './Card';
import IconSearch from '../icons/IconSearch';

type 		TSearchBox = {
	searchTerm: string,
	onChange: (s: string) => void
	onSearch?: (s: string) => void
	isNarrow?: boolean,
	backgroundColor?: string,
	ariaLabel?: string
}
function	SearchBox({
	searchTerm,
	onChange,
	onSearch,
	isNarrow,
	backgroundColor = 'transparent',
	ariaLabel = 'Search'
}: TSearchBox): ReactElement {
	return (
		<Card padding={'none'}>
			<form
				name={'search'}
				onSubmit={(e): void => {
					e.preventDefault();
					if (onSearch)
						onSearch(searchTerm);
				}}>
				<label
					aria-label={ariaLabel}
					className={`flex flex-row items-center w-full ${isNarrow ? 'h-10 p-2' : 'h-14 p-4'} text-typo-secondary rounded-lg border-2 border-surface focus-within:border-primary transition-colors ${backgroundColor}`}>
					<span className={'sr-only'}>{ariaLabel}</span>
					<IconSearch className={isNarrow ? 'w-4 h-4 mr-2' : 'w-6 h-6 mr-4'} />
					<input
						value={searchTerm}
						onChange={(e): void => onChange(e.target.value)}
						type={'text'}
						className={`p-0 w-full bg-transparent border-none focus:border-none outline-none focus:outline-none focus:ring-0 ${isNarrow ? 'h-10' : 'h-14'}`}
						placeholder={'Search'} />
				</label>
			</form>
		</Card>
	);
}

export {SearchBox};