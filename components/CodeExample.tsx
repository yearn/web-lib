import	React, {ReactElement, ReactNode}	from	'react';
import	{RadialBackground}					from	'components/RadialBackground';


function	CodeExample({children}: {children: ReactNode}): ReactElement {
	return (
		<div className={'box-gradient-default'}>
			{children}
			<RadialBackground />
		</div>
	);
}

export default CodeExample;