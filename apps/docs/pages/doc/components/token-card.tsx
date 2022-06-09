import	React, {ReactElement}	from	'react';
import	{Card, TokenCard}		from	'@yearn/web-lib/components';
import	ComponentAPI			from	'components/documentation/ComponentAPI';
import	Highlight				from	'components/documentation/Highlight';

const code = `
import	React		from	'react';
import	{TokenCard}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<TokenCard.Wrapper>
			<TokenCard
				label={'Curve Rocket Pool'}
				value={'NEW ✨'}
				imgSrc={'/token.png'}
				onClick={(): void => alert('Hello!')} />
			<TokenCard
				label={'Curve CVX-ETH'}
				value={'34.02%'}
				imgSrc={'/token2.png'}
				onClick={(): void => alert('Hello!')} />
		</TokenCard.Wrapper>
	);
}`.trim();

export function TokenCardComponent(): ReactElement {
	return (
		<div className={'w-4/5'}>
			<TokenCard
				className={'col-span-12'}
				label={'Curve Rocket Pool'}
				value={'NEW ✨'}
				imgSrc={'/token.png'}
				onClick={(): void => alert('Hello!')} />
		</div>
	);
}

function	DocumentationTokenCard(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-neutral-700'}>{'TokenCard'}</h1>				
				<div className={'box-gradient-default'}>
					<div className={'w-3/4'}>
						<TokenCard.Wrapper>
							<TokenCard
								label={'Curve Rocket Pool'}
								value={'NEW ✨'}
								imgSrc={'/token.png'}
								onClick={(): void => alert('Hello!')} />
							<TokenCard
								label={'Curve CVX-ETH'}
								value={'34.02%'}
								imgSrc={'/token2.png'}
								onClick={(): void => alert('Hello!')} />
						</TokenCard.Wrapper>
					</div>
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'The TokenCard is a component used to display a token image, label and value.'}</p>
				<p className={'mb-4'}>{'A subcomponent, the TokenCard.Wrapper, is also available to multiple TokenCard together. Size of each card and grid should be controlled with the className props. The wrapper is just a div with `grid grid-cols-12 gap-4` as className.'}</p>
				<ComponentAPI
					elements={[{
						title: 'label',
						type: 'string',
						description: 'Small displayed text to indicate the token name.'
					},
					{
						title: 'value',
						type: 'string',
						description: 'Statistic to display with a bolder and bigger font.'
					},
					{
						title: 'imgeSrc',
						type: 'string',
						description: 'Image source URL for token.'
					},
					{
						title: 'onClick?',
						type: 'React.MouseEventHandler',
						description: 'Function to call on mouse click. Enables hover and shows the chevron icon if this is set. Default to undefined.'
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

export default DocumentationTokenCard;
