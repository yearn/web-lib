import React from 'react';
import IconSearch from '@yearn-finance/web-lib/icons/IconSearch';

import type {ReactElement} from 'react';

export type TSearchBox = {
	searchTerm: string;
	onChange: (s: string) => void;
	onSearch?: (s: string) => void;
	isNarrow?: boolean;
	ariaLabel?: string;
	placeholder?: string;
};

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
