import {ReactNode} from 'react';

export type TStatisticCard = {
	label: string;
	value: ReactNode;
	variant?: 'surface' | 'background';
} & React.ComponentPropsWithoutRef<'div'>;
