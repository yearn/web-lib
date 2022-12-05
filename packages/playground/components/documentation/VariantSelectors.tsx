import	React		from	'react';

import type {ReactElement} from 'react';

type 		TVariantSelector = {
	onChange: (n: number) => void,
	variants: string[],
	selected: string
}
function	VariantSelectors({onChange, variants, selected}: TVariantSelector): ReactElement {
	return (
		<div className={'absolute top-4 right-4 space-y-2'}>
			{variants.map((variant, index): ReactElement => (
				<div
					key={`${variant}_${index}`}
					onClick={(): void => onChange(index)}
					aria-selected={variant === selected}
					className={'button-variant'}>
					{index + 1}
				</div>
			))}
		</div>
	);
}
export default VariantSelectors;
