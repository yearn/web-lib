import React, {ReactElement} from 'react';
import {Card} from './Card';
import IconSearch from '../icons/IconSearch';
import type * as SearchBoxTypes	from './SearchBox.d';

function	SearchBox({
	searchTerm,
	onChange,
	onSearch,
	isNarrow,
	ariaLabel = 'Search'
}: SearchBoxTypes.TSearchBox): ReactElement {
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
					className={`yearn--searchBox ${isNarrow ? 'h-10 p-2' : 'h-14 p-4'}`}>
					<span className={'sr-only'}>{ariaLabel}</span>
					<IconSearch className={isNarrow ? 'w-4 h-4 mr-2' : 'w-6 h-6 mr-4'} />
					<input
						value={searchTerm}
						onChange={(e): void => onChange(e.target.value)}
						type={'text'}
						className={`yearn--searchBox-input ${isNarrow ? 'h-10' : 'h-14'}`}
						placeholder={'Search'} />
				</label>
			</form>
		</Card>
	);
}

export {SearchBox};