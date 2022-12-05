import	React		from	'react';

import type {ReactElement} from 'react';

function	RadialBackground(): ReactElement {
	return (
		<div className={'absolute inset-0 z-[-1] overflow-hidden'}>
			<div
				className={'animate-rotate-center absolute inset-0 aspect-square bg-[#0657F9]'}
				style={{
					backgroundImage: `
								radial-gradient(at 21% 33%, #5189fb 0px, transparent 50%),
								radial-gradient(at 79% 32%, #0657F9 0px, transparent 50%),
								radial-gradient(at 26% 83%, #0546c7 0px, transparent 50%)`
				}}
			/>
		</div>
	);
}
export {RadialBackground};