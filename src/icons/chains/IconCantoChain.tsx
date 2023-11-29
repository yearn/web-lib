import React from 'react';

import type {ReactElement} from 'react';

export function IconCantoChain(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={32}
			height={32}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 32 32'}
			{...props}>
			<g clipPath={'url(#clip0_621_285364)'}>
				<path
					fill={'#06FC99'}
					d={'M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z'}
				/>
				<path
					fill={'#000'}
					fillRule={'evenodd'}
					d={
						'M25 6v20H10.375v-3.53H7V9.53h3.375V6H25zM13.187 9.53h8.438v3.529h-8.438v-3.53zm8.438 10h-8.438v-6.471H9.812v6.47h3.375v3.53h8.438v-3.53z'
					}
					clipRule={'evenodd'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_621_285364'}>
					<path
						fill={'#fff'}
						d={'M0 0H32V32H0z'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
