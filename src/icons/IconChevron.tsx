import	React	from	'react';

import type {ReactElement} from 'react';

export function	IconChevron(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={24}
			height={24}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 24 24'}
			{...props}>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={'M16.7526 19.6585C16.3889 20.0741 15.7571 20.1162 15.3415 19.7526L7.34148 12.7526C7.12447 12.5627 6.99999 12.2883 6.99999 12C6.99999 11.7116 7.12447 11.4373 7.34148 11.2474L15.3415 4.24741C15.7571 3.88373 16.3889 3.92585 16.7526 4.34148C17.1162 4.75712 17.0741 5.38888 16.6585 5.75256L9.51858 12L16.6585 18.2474C17.0741 18.6111 17.1162 19.2429 16.7526 19.6585Z'}
				fill={'currentcolor'}/>
		</svg>
	);
}
