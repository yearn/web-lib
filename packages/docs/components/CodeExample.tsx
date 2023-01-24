import	React	from	'react';
import	{RadialBackground}					from	'components/RadialBackground';

import type {ReactElement, ReactNode} from 'react';

function	CodeExample({children}: {children: ReactNode}): ReactElement {
	return (
		<div className={'box-gradient-default mt-6'}>
			{children}
			<RadialBackground />
		</div>
	);
}

export {CodeExample};
export default CodeExample;
