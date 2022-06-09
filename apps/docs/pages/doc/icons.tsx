import	React, {ReactElement}		from	'react';
import	{Card}						from	'@yearn/web-lib/components';
import	* as Icons					from	'@yearn/web-lib/icons';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';

const code = `
import	React		from	'react';
import	{Hamburger}	from	'@yearn/web-lib/icons';

export default function	App(): React.ReactElement {
	return (
		<Hamburger className={'w-6 h-6'} />
	);
}`.trim();

function	DocumentationSwitch(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'Icons'}</h1>
				<div className={'box-gradient-default'}>
					<div className={'grid grid-cols-6 gap-10 w-full'}>
						{Object.entries(Icons).map(([name, icon]): ReactElement => (
							<div key={name} className={'flex-col flex-center'}>
								{React.createElement(icon as any, {className: 'text-white w-6 h-6'})}
								<p className={'mt-1 text-xs text-white'}>{name}</p>
							</div>
						))}
					</div>
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'A set of Icons is available through this lib. The Icons are SVG components wrapped as React elements with the currentColor as default fill/stroke/line color. No size is provided by default so this should be sent as props, class or style.'}</p>
				<p className={'mb-4'}>{'Any props available to SVG can be used.'}</p>

				<ComponentAPI
					elements={[{
						title: 'className?',
						type: 'string',
						description: 'Custom className to provide to alter the style of the Icon.'
					}]} />

			</Card>
		</section>
	);
}

export default DocumentationSwitch;
