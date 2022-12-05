import	React, {useState}		    from 'react';
import {CodeExample}    from 'components/CodeExample';
import {SearchBox} from '@yearn-finance/web-lib/components';

import type {TSearchBox} from '@yearn-finance/web-lib/components';

function	SearchBoxExample(props: TSearchBox): React.ReactElement {
	const	[searchTerm, set_searchTerm] = useState('');

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
