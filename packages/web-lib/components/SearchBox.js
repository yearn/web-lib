import React from 'react';
import IconSearch from '@yearn-finance/web-lib/icons/IconSearch';
function SearchBox(props) {
    const { searchTerm, onChange, onSearch, isNarrow, ariaLabel = 'Search', placeholder = 'Search' } = props;
    return (React.createElement("div", { className: 'yearn--searchBox-wrapper' },
        React.createElement("form", { name: ariaLabel, onSubmit: (e) => {
                e.preventDefault();
                if (onSearch) {
                    onSearch(searchTerm);
                }
            } },
            React.createElement("label", { "aria-label": ariaLabel, "data-padding": isNarrow ? 'narrow' : 'regular', className: 'yearn--searchBox' },
                React.createElement("span", { className: 'sr-only' }, ariaLabel),
                React.createElement(IconSearch, null),
                React.createElement("input", { value: searchTerm, onChange: (e) => onChange(e.target.value), type: 'text', className: 'yearn--searchBox-input', placeholder: placeholder })))));
}
export { SearchBox };
