import	React	from	'react';

import type {ReactElement} from 'react';

function	IconNone(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			xmlns={'http://www.w3.org/2000/svg'}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			{...props}>
		</svg>
	);
}

export default IconNone;