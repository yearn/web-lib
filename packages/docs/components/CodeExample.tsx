import	React, {ReactElement, ReactNode}	from	'react';
import	{RadialBackground}					from	'components/RadialBackground';

function	CodeExample({children}: {children: ReactNode}): ReactElement {
	return (
		<div className={'mt-6 box-gradient-default'}>
			{children}
			<RadialBackground />
		</div>
	);
}

export {CodeExample};
export default CodeExample;