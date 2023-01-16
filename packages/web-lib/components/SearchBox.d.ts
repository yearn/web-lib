import type { ReactElement } from 'react';
export type TSearchBox = {
    searchTerm: string;
    onChange: (s: string) => void;
    onSearch?: (s: string) => void;
    isNarrow?: boolean;
    ariaLabel?: string;
    placeholder?: string;
};
declare function SearchBox(props: TSearchBox): ReactElement;
export { SearchBox };
