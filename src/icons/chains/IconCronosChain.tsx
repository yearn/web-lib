import React from 'react';

import type {ReactElement} from 'react';

export function IconCronosChain(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={32}
			height={32}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 32 32'}
			{...props}>
			<g clipPath={'url(#clip0_621_285297)'}>
				<path
					fill={'#051221'}
					d={'M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z'}
				/>
				<path
					fill={'#fff'}
					fillRule={'evenodd'}
					d={
						'M15.992 4L6 10v12l9.992 6h.016L26 22V10l-2.964 1.781v8.455l-7.044 4.22v-.018l-7.028-4.219v-8.455l7.028-4.202 7.044 4.219L26 10 15.992 4zm.016 17.602l4.663-2.8-1.932-1.16-2.73 1.643-2.732-1.642v-3.268l2.715-1.643 2.73 1.643 1.95-1.176-4.664-2.801-4.68 2.8v5.603l4.68 2.801z'
					}
					clipRule={'evenodd'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_621_285297'}>
					<path
						fill={'#fff'}
						d={'M0 0H32V32H0z'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
