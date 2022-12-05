import	React		from	'react';

import type {ReactElement} from 'react';

type 		TComponentAPI = {
	elements: {
		title: string,
		type: string,
		description: string
	}[]
}
function	ComponentAPI({elements}: TComponentAPI): ReactElement {
	return (
		<section aria-label={'component API'} className={'mt-6'}>
			<h4>{'Component API'}</h4>
			<dl className={'mt-4 w-full space-y-4'}>
				{elements.map((element, index): ReactElement => (
					<dd
						key={`${element.title}_${index}`}
						className={'rounded-default grid grid-cols-12 space-y-4 bg-neutral-200 p-4 md:space-y-0'}>
						<div className={'col-span-12 md:col-span-2'}>
							<b className={'break-words font-mono'}>{element.title}</b>
						</div>
						<div className={'col-span-12 whitespace-pre pl-0 md:col-span-4 md:pl-2'}>
							<p className={'font-mono'}>{element.type}</p>
						</div>
						<div className={'col-span-12 pl-0 md:col-span-6 md:pl-4'}>
							<p className={'font-mono'}>{element.description}</p>
						</div>
					</dd>
				))}
			</dl>
		</section>
	);
}
export default ComponentAPI;
