import React, {ReactElement} 			from 	'react';
import type * as DescriptionListTypes	from	'./DescriptionList.d';

function DescriptionList({options, className, ...props}: DescriptionListTypes.TDescriptionList): ReactElement {
	return (
		<dl className={`flex flex-col space-y-4 ${className}`} {...props}>
			{options.map((option): ReactElement => (
				<span className={'flex flex-row items-center'} key={option.title}>
					<dt className={'mr-8 w-5/12 text-left text-typo-secondary-variant'}>
						{option.title}
					</dt>
					<dd className={'w-7/12 font-bold tabular-nums text-left text-typo-primary'}>
						{option.details}
					</dd>
				</span>
			))}
		</dl>
	);
}

export {DescriptionList};