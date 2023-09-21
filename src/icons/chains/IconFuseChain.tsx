import React from 'react';

import type {ReactElement} from 'react';

export function	IconFuseChain(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={32}
			height={32}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 32 32'}
			{...props}>
			<g clipPath={'url(#clip0_621_285349)'}>
				<path
					fill={'#AAF7AF'}
					d={'M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z'}
				/>
				<path
					fill={'#000'}
					fillRule={'evenodd'}
					d={'M12.568 7.064l3.29-2.02a.289.289 0 01.304 0l8.674 5.324a.33.33 0 01.152.279L25 14.309a.327.327 0 01-.153.281l-3.286 2.018c-.202.125-.455-.03-.456-.279l-.01-3.287a.327.327 0 00-.153-.278l-8.374-5.14a.333.333 0 010-.56zm-2.126 16.589l-3.29-2.02a.325.325 0 01-.152-.28v-10.65c0-.115.058-.221.151-.28l2.978-1.842a.286.286 0 01.304 0l3.287 2.018a.334.334 0 010 .56l-2.67 1.652a.326.326 0 00-.152.28v10.283c0 .25-.253.404-.456.279zM25 21.353V17.31c0-.249-.254-.404-.457-.28l-8.374 5.142a.289.289 0 01-.303 0l-2.682-1.633c-.202-.123-.455.032-.455.28v4.035c0 .116.059.224.154.281l2.989 1.82c.093.058.209.058.302 0l8.674-5.324a.325.325 0 00.152-.28z'}
					clipRule={'evenodd'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_621_285349'}>
					<path fill={'#fff'} d={'M0 0H32V32H0z'} />
				</clipPath>
			</defs>
		</svg>
	);
}
