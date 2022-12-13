import	React		from	'react';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';
import	{Card}						from	'@yearn-finance/web-lib/components/Card';
import	{Header}					from	'@yearn-finance/web-lib/layouts/Header';

import type {ReactElement} from 'react';

const code = `
import	React		from	'react';
import	{Header}	from	'@yearn-finance/web-lib/layouts';

export default function	App(): React.ReactElement {
	return (
		<Header>
			<h1>{'I am a Title'}</h1>
		</Header>
	);
}`.trim();


function	DocumentationCard(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'Header'}</h1>				
				<div className={'box-gradient-default'}>
					<div className={'w-3/4'}>
						<Header>
							<h1>{'I am a Title'}</h1>
						</Header>
					</div>
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The Header is a custom Card that should be displayed on the top of your app, containing a title (the title of the app or the page) and some default elements.'}</p>
				<p className={'mb-4'}>{'On the end part of the header, the network selector will be displayed. Next to it, if the correct env variable is set, the wallet connect button will be set too.'}</p>

				<ComponentAPI
					elements={[
						{
							title: '-',
							type: '-',
							description: '-'
						}
					]} />
			</Card>
		</section>
	);
}

export default DocumentationCard;
