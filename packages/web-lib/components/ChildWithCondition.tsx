
import React, {Fragment} from 'react';

import type {ReactElement, ReactNode} from 'react';

export type TChildWithCondition = {
	shouldRender: boolean;
	children: ReactNode[] | ReactNode | ReactElement | null;
	fallback?: ReactNode[] | ReactNode | ReactElement | null;
};

function	ChildWithCondition({shouldRender, children, fallback = null}: TChildWithCondition): ReactElement | null {
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
export default ChildWithCondition;
