export type TSwitchTheme = {
	theme: string;
	switchTheme: () => void;
} & React.ComponentPropsWithoutRef<'div'>;
