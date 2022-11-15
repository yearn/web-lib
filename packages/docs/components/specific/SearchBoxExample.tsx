import	React		    from 'react';
import {CodeExample}    from 'components/CodeExample';
import {SearchBox, TSearchBox}       from '@yearn-finance/web-lib/components';

function	SearchBoxExample(props: TSearchBox): React.ReactElement {
	const	[searchTerm, set_searchTerm] = React.useState('');

	return (
		<CodeExample>
			<SearchBox
				{...props}
				searchTerm={searchTerm}
				onChange={set_searchTerm}
				/>
		</CodeExample>
	);
}

export {SearchBoxExample};
export default SearchBoxExample;
