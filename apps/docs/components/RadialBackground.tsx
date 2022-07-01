import	React, {ReactElement}		from	'react';

function	RadialBackground(): ReactElement {
	return (
		<div className={'overflow-hidden absolute inset-0 z-[-1]'}>
			<div
				className={'absolute inset-0 w-full h-full bg-[#FF90A1] animate-rotate-center'}
				style={{
					backgroundImage: `
								radial-gradient(at 21% 33%, #FF90A1 0px, transparent 50%),
								radial-gradient(at 79% 32%, #C35B6E 0px, transparent 50%),
								radial-gradient(at 26% 83%, #C35B6E 0px, transparent 50%)`
				}}
			/>
		</div>
	);
}
export {RadialBackground};