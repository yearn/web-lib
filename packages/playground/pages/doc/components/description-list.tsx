import React from 'react';
import CodeExample from 'components/CodeExample';
import ComponentAPI from 'components/documentation/ComponentAPI';
import Highlight from 'components/documentation/Highlight';
import {Card} from '@yearn-finance/web-lib/components/Card';
import {DescriptionList} from '@yearn-finance/web-lib/components/DescriptionList';

import type {ReactElement} from 'react';

const code = `
import React from 'react';
import {Card, DescriptionList} from '@yearn-finance/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Card>
			<DescriptionList
				options={[
					{title: 'API Version', details: '0.4.2'}, 
					{title: 'Emergency shut down', details: 'NO'}, 
					{title: 'Since Last Report', details: '3 days'}, 
					{title: 'Management fee', details: '10%'}, 
					{title: 'Performance fee', details: '80%'}
				]} />
		</Card>
	);
}`.trim();


export function	DescriptionListComponent(): ReactElement {
	return (
		<div className={'w-full md:w-4/5'}>
			<Card>
				<DescriptionList
					options={[
						{title: 'API Version', details: '0.4.2'}, 
						{title: 'Performance fee', details: '80%'}
					]} />
			</Card>
		</div>
	);
}

function	DocumentationDescriptionList(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'DescriptionList'}</h1>				
				<CodeExample>
					<div className={'w-3/4'}>
						<Card>
							<DescriptionList
								options={[
									{title: 'API Version', details: '0.4.2'}, 
									{title: 'Emergency shut down', details: 'NO'}, 
									{title: 'Since Last Report', details: '3 days'}, 
									{title: 'Management fee', details: '10%'}, 
									{title: 'Performance fee', details: '80%'}
								]} />
						</Card>
					</div>
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The DescriptionList component is a mimic of the <dl> HTML element. The element encloses a list of groups of terms (provided by the title element) and descriptions (provided by the details elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).'}</p>
				<p className={'mb-4'}>{'Note: The Card element is used on this representation to give a structure to the list, but the raw component has no background.'}</p>
				<ComponentAPI
					elements={[
						{
							title: 'variant?',
							type: 'surface | background',
							description: 'Used to indicate if the Card is displayed on the Background (use surface) or on a Surface (use background). Default set to surface.'
						},
						{
							title: 'options',
							type: '[{\n\ttitle: string,\n\tdetails: string\n}]',
							description: 'Array of pairs to display. This will be the displayed elements of this list, with the title on the left part and the details as value in bold. Elements are separated by 16px.'
						}
					]} />
			</Card>
		</section>
	);
}

export default DocumentationDescriptionList;
