import React, {ReactElement} from 'react';

import type {TDescriptionList} from './DescriptionList.d';

function DescriptionList(props: TDescriptionList): ReactElement {
	const {options, className, ...rest} = props;

	return (
		<dl className={`flex flex-col space-y-4 ${className}`} {...rest}>
			{options.map((option): ReactElement => (
				<span className={'flex flex-row items-center'} key={option.title}>
					<dt className={'mr-8 w-5/12 text-left text-neutral-500/80'}>
						{option.title}
					</dt>
					<dd className={'w-7/12 text-left font-bold tabular-nums text-neutral-700'}>
						{option.details}
					</dd>
				</span>
			))}
		</dl>
	);
}

export {DescriptionList};