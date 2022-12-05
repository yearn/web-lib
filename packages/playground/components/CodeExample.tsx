import	React	from	'react';
import	{RadialBackground}					from	'components/RadialBackground';

import type {ReactElement, ReactNode} from 'react';


function	CodeExample({children}: {children: ReactNode}): ReactElement {
	return (
		<div className={'box-gradient-default'}>
			{children}
			<RadialBackground />
		</div>
	);
}

export default CodeExample;