export type TTokenCard = {
	label: string;
	value: string;
	imgSrc: string;
	onClick?: React.MouseEventHandler;
} & React.ComponentPropsWithoutRef<'div'>;
