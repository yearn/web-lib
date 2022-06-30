import	React, {ReactElement}		from	'react';

function	RadialBackground(): ReactElement {
	return (
		<div className={'overflow-hidden absolute inset-0 z-[-1]'}>
			<div
				className={'aspect-square absolute inset-0 bg-[#0657F9] animate-rotate-center'}
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