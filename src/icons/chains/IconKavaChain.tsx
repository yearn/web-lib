import React from 'react';

import type {ReactElement} from 'react';

export function IconKavaChain(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={32}
			height={32}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 32 32'}
			{...props}>
			<g clipPath={'url(#clip0_621_285361)'}>
				<path
					fill={'#FF564F'}
					d={'M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z'}
				/>
				<path
					fill={'#fff'}
					d={'M9.588 21.997L10.573 25l6.76-9-6.76-9L9.54 9.938l4.49 6.06-4.442 5.999z'}
					opacity={'0.2'}
				/>
				<path
					fill={'#fff'}
					fillRule={'evenodd'}
					d={'M11.571 7H9v17.998h2.571V7zm9.221 17.998H24l-6.666-9L24 7h-3.208l-6.762 8.998 6.762 9z'}
					clipRule={'evenodd'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_621_285361'}>
					<path
						fill={'#fff'}
						d={'M0 0H32V32H0z'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
