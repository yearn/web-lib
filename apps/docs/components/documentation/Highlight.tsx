import	React, {ReactElement, ReactNode}	from	'react';
import	PrismHighlight, {defaultProps}		from	'prism-react-renderer';
import	vsDark								from	'prism-react-renderer/themes/vsDark';

function	Highlight({code}: {code: string}): ReactElement {
	return (
		<div>
			<PrismHighlight
				{...defaultProps}
				theme={vsDark}
				code={code}
				language={'tsx'}>
				{({className, style, tokens, getLineProps, getTokenProps}): ReactNode => (
					<pre className={className} style={style}>
						{tokens.map((line, i): ReactElement => (
							<div key={i} {...getLineProps({line, key: i})}>
								{line.map((token, key): ReactElement => (
									<span key={key} {...getTokenProps({token, key})} />
								))}
							</div>
						))}
					</pre>
				)}
			</PrismHighlight>
		</div>
	);
}

export default Highlight;
