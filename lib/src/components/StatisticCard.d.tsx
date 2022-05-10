export type TStatisticCard = {
	label: string;
	value: string;
	variant?: 'surface' | 'background';
} & React.ComponentPropsWithoutRef<'div'>;
