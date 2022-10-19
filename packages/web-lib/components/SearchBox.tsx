import React, {ReactElement} from 'react';
import IconSearch from '@majorfi/web-lib/icons/IconSearch';

import type {TSearchBox} from './SearchBox.d';

function	SearchBox(props: TSearchBox): ReactElement {
	const {searchTerm, onChange, onSearch, isNarrow, ariaLabel = 'Search', placeholder = 'Search'} = props;

	return (
		<div className={'yearn--searchBox-wrapper'}>
			<form
				name={ariaLabel}
				onSubmit={(e): void => {
					e.preventDefault();
					if (onSearch) {
						onSearch(searchTerm);
					}
				}}>
				<label
					aria-label={ariaLabel}
					data-padding={isNarrow ? 'narrow' : 'regular'}
					className={'yearn--searchBox'}>
					<span className={'sr-only'}>{ariaLabel}</span>
					<IconSearch />
					<input
						value={searchTerm}
						onChange={(e): void => onChange(e.target.value)}
						type={'text'}
						className={'yearn--searchBox-input'}
						placeholder={placeholder} />
				</label>
			</form>
		</div>
	);
}

export {SearchBox};