export type TSearchBox = {
	searchTerm: string;
	onChange: (s: string) => void;
	onSearch?: (s: string) => void;
	isNarrow?: boolean;
	ariaLabel?: string;
};
