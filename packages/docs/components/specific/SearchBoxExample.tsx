import	React		    from 'react';
import {CodeExample}    from 'components/CodeExample';
import {SearchBox}       from '@majorfi/web-lib/components';

function	SearchBoxExample(props): React.ReactElement {
	const	[searchTerm, set_searchTerm] = React.useState('');

	return (
		<CodeExample>
			<SearchBox
				searchTerm={searchTerm}
				onChange={set_searchTerm}
				{...props} />
		</CodeExample>
	);
}

export {SearchBoxExample};
export default SearchBoxExample;
