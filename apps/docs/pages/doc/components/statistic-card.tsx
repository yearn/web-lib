import	React, {ReactElement}		from	'react';
import	{Card, StatisticCard}		from	'@yearn/web-lib/components';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';
import	CodeExample					from	'components/CodeExample';

const code = `
import	React			from	'react';
import	{StatisticCard}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<StatisticCard.Wrapper>
			<StatisticCard
				label={'TVL'}
				value={'1 003 030 $'} />
			<StatisticCard
				label={'Audit Score'}
				value={'2'} />
			<StatisticCard
				label={'Complexity Ratio'}
				value={'42%'} />
		</StatisticCard.Wrapper>
	);
}`.trim();

export function	StatsCardComponent(): ReactElement {
	return (
		<div className={'w-full md:w-4/5'}>
			<StatisticCard.Wrapper>
				<StatisticCard
					className={'col-span-6'}
					label={'TVL'}
					value={'1 003 $'} />
				<StatisticCard
					className={'col-span-6'}
					label={'Audit Score'}
					value={'2'} />
			</StatisticCard.Wrapper>
		</div>
	);
}

function	DocumentationStatCard(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'StatisticCard'}</h1>				
				<CodeExample>
					<div className={'w-3/4'}>
						<StatisticCard.Wrapper>
							<StatisticCard
								label={'TVL'}
								value={'1 003 030 $'} />
							<StatisticCard
								label={'Audit Score'}
								value={'2'} />
							<StatisticCard
								label={'Complexity Ratio'}
								value={'42%'} />
						</StatisticCard.Wrapper>
					</div>
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The StatisticCard is a simple component used to display, in a Card, a label and a value. This is mostly used to highlight some important numbers or informations.'}</p>
				<p className={'mb-4'}>{'A subcomponent, the StatisticCard.Wrapper, is also available in order to wrap a bunch of StatisticCard together. Size of each card and grid should be controlled with the className props. The wrapper is just a div with `grid grid-cols-12 gap-4` as className.'}</p>
				<ComponentAPI
					elements={[{
						title: 'variant?',
						type: 'surface | background',
						description: 'Used to indicate if the Card is displayed on the Background (use surface) or on a Surface (use background). Default set to surface.'
					},
					{
						title: 'label',
						type: 'string',
						description: 'Small displayed text to indicate what the statistic is about.'
					},
					{
						title: 'value',
						type: 'string',
						description: 'Statistic to display with a bolder and bigger font.'
					},
					{
						title: 'className?',
						type: 'string',
						description: 'Custom className to provide to alter the style of the Card. This could be useful to define the size of the card in the grid. Default is `col-span-12 md:col-span-4` with a `grid-cols-12` wrapper.'
					}]} />
			</Card>
		</section>
	);
}

export default DocumentationStatCard;
