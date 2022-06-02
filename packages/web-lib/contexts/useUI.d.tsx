export type TUIOptions = {
	shouldUseDefaultToaster: boolean,
	shouldUseThemes: boolean
}

export type TPossibleThemes = 'dark' | 'light';

export type	TUIContext = {
	theme: string,
	switchTheme: () => void,
	toast: unknown
}