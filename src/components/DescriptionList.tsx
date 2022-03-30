import React, {ReactElement} from 'react';

export type TDescriptionListOption = {
	title: string;
	details: string | ReactElement;
}
  
export type TDescriptionList = {
	options: TDescriptionListOption[];
	className?: string;
}

function DescriptionList({options, className, ...props}: TDescriptionList): ReactElement {
	return (
		<dl className={`inline-dl ${className}`} {...props}>
			{options.map((option): ReactElement => (
				<span key={option.title}>
					<dt>{option.title}</dt>
					<dd>{option.details}</dd>
				</span>
			))}
		</dl>
	);
}

export {DescriptionList};