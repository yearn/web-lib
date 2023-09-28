import React from 'react';

import type {ReactElement} from 'react';

export function	IconZkSyncChain(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={32}
			height={32}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 32 32'}
			{...props}>
			<g clipPath={'url(#clip0_621_285377)'}>
				<path
					fill={'#fff'}
					d={'M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z'}
				/>
				<path
					fill={'#000'}
					fillRule={'evenodd'}
					d={'M10.808 22.997L4 16 10.808 9v3.735l6.76.005-6.76 5.173v5.084zM21.192 9.003L28 16 21.192 23v-3.735l-6.76-.005 6.76-5.132V9.003z'}
					clipRule={'evenodd'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_621_285377'}>
					<path fill={'#fff'} d={'M0 0H32V32H0z'} />
				</clipPath>
			</defs>
		</svg>
	);
}
