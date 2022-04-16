import	React, {ReactElement}		from	'react';
import	{Card, SwitchTheme}			from	'@yearn/web-lib/components';
import	{useUI}						from	'@yearn/web-lib/contexts';
import	ComponentAPI				from	'components/documentation/ComponentAPI';
import	Highlight					from	'components/documentation/Highlight';

const code = `
import	React			from	'react';
import	{SwitchTheme}	from	'@yearn/web-lib/components';
import	{useUI}			from	'@yearn/web-lib/contexts';

export default function	App(): React.ReactElement {
	const	{theme, switchTheme} = useUI();

	return (
		<SwitchTheme
			theme={theme}
			switchTheme={switchTheme} />
	);
}`.trim();

export function	SwitchThemeComponent(): ReactElement {
	const	{theme, switchTheme} = useUI();
	return (
		<SwitchTheme
			theme={theme}
			switchTheme={switchTheme} />
	);
}

function	DocumentationSwitchTheme(): ReactElement {

	return (
		<section aria-label={'some default section'}>
			<Card>
				<h1 className={'mb-2 text-3xl text-typo-primary'}>{'SwitchTheme'}</h1>
				<div className={'box-gradient-alt'}>
					<SwitchThemeComponent />
				</div>
				<Highlight code={code} />

				<h4 className={'mt-6 mb-1'}>{'Description'}</h4>
				<p className={'mb-2'}>{'A custom switch component to alternate between light theme (default) and dark theme. Alternate themes are not handled by this component.'}</p>
				<p className={'mb-4'}>{'The component has headless states, meaning you have to send him the useState and you can controle the callback.'}</p>

				<ComponentAPI
					elements={[{
						title: 'theme',
						type: 'light | dark',
						description: 'Current theme used. You should use useUI in order to get it.'
					},
					{
						title: 'switchTheme',
						type: 'function',
						description: 'Function to trigger the theme switch. You should use useUI in order to get it.'
					}]} />

			</Card>
		</section>
	);
}

export default DocumentationSwitchTheme;
