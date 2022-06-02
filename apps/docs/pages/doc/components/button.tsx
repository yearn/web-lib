import	React, {ReactElement}		from	'react';
import	{Card, Button}				from	'@yearn/web-lib/components';
import	VariantSelectors			from	'components/documentation/VariantSelectors';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';
import	CodeExample					from	'components/CodeExample';
import	type * as ButtonTypes		from	'@yearn/web-lib/components/Button.d';

const code = `
import	React		from	'react';
import	{Button}	from	'@yearn/web-lib/components';

export default function	App(): React.ReactElement {
	return (
		<Button
			variant={'filled'}
			onClick={(): void => console.log('Do something')}
			disabled={false}
			className={'min-w-[132px]'}>
			{'Whao, such Woofy'}
		</Button>
	);
}`.trim();

export function	ButtonsComponent(): ReactElement {
	return (
		<div className={'mx-auto'}>
			<Button
				variant={'light'}
				onClick={(): void => console.log('Do something')}
				className={'min-w-[132px]'}>
				{'Button'}
			</Button>
		</div>
	);
}

function	DocumentationButton(): ReactElement {
	const	[isDisabled, set_isDisabled] = React.useState(false);
	const	[variant, set_variant] = React.useState(0);
	const	variantType: ButtonTypes.TButtonVariant[] = ['outlined', 'filled', 'light'];

	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'Button'}</h1>
				<CodeExample>
					<Button
						variant={variantType[variant]}
						onClick={(): void => console.log('Do something')}
						isDisabled={isDisabled}
						className={'min-w-[132px]'}>
						{variantType[variant]}
					</Button>
					<VariantSelectors
						selected={variantType[variant]}
						variants={variantType}
						onChange={(n: number): void => set_variant(n)} />
					<div className={'absolute right-4 bottom-4'}>
						<div
							onClick={(): void => set_isDisabled(!isDisabled)}
							aria-selected={isDisabled}
							className={'button-variant-label'}>
							{'Disable'}
						</div>
					</div>
				</CodeExample>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-4'}>{'Well it\'s nothing more than a button. It comes in 3 variants for each theme: filled (default), outlined and light. All the default props for the buttons HTML components are available and some extra are exposed.'}</p>

				<ComponentAPI
					elements={[{
						title: 'variant?',
						type: 'filled | outlined | light',
						description: 'Used to indicate which kind of button we want to use. Default is set to filled.'
					},
					{
						title: 'as?',
						type: 'button | a',
						description: 'Indicate if we should use a <a> element or a <button> element. In some case, <a> is best suited (when the onClick action is a routing), allowing the right-click/open in new tab action. Default set to button.'
					}]} />

			</Card>
		</section>
	);
}

export default DocumentationButton;
