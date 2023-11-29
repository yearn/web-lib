import React from 'react';

import type {ReactElement} from 'react';

export function IconBNBChain(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={32}
			height={32}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 32 32'}
			{...props}>
			<g
				fillRule={'evenodd'}
				clipPath={'url(#clip0_621_285291)'}
				clipRule={'evenodd'}>
				<path
					fill={'#F0B90B'}
					d={'M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0z'}
				/>
				<path
					fill={'#fff'}
					d={
						'M22.135 15.118l-.013-2.491h.01L19.87 11.38l-3.877 2.138-3.853-2.138-2.26 1.246v2.491l3.876 2.128v4.265l2.25 1.234 2.252-1.234v-4.265l3.877-2.128zM15.995 5L9.878 8.373l2.251 1.246 3.866-2.138 3.876 2.138 2.251-1.246L15.995 5zM8.264 20.255L8.25 16l-2.25-1.244v6.756l6.128 3.362v-2.491l-3.865-2.128zm-.013-6.03v-2.48l2.262-1.246-2.262-1.245L6 10.499v2.48l2.251 1.246zm7.744-4.971l-2.252 1.245 2.252 1.246 2.262-1.246-2.263-1.245zm-3.866 8.874l-2.251-1.246v2.491l2.251 1.234v-2.48zm3.866 6.392l-2.252-1.245v2.48L15.995 27l2.262-1.246v-2.48l-2.263 1.246zm7.741-15.266l-2.25 1.245 2.25 1.246v2.48L26 12.979v-2.48l-2.263-1.245zm2.264 5.5L23.749 16l-.013 4.255-3.864 2.126v2.491L26 21.511v-6.757zm-3.878 4.62l-2.252 1.233v-2.48l2.252-1.245v2.491z'
					}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_621_285291'}>
					<path
						fill={'#fff'}
						d={'M0 0H32V32H0z'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
