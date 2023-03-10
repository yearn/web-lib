
import React, {Fragment} from 'react';

import type {ReactElement, ReactNode} from 'react';

export type TRenderable = {
	shouldRender: boolean;
	children: ReactNode[] | ReactNode | ReactElement | null;
	fallback?: ReactNode[] | ReactNode | ReactElement | null;
};

function	Renderable({shouldRender, children, fallback = null}: TRenderable): ReactElement | null {
	if (shouldRender) {
		return (
			<Fragment>
				{children}
			</Fragment>
		);
	}
	if (fallback === null) {
		return null;
	}
	return (
		<Fragment>
			{fallback}
		</Fragment>
	);
}
export default Renderable;
