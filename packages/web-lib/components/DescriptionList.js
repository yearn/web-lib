import React from 'react';
function DescriptionList(props) {
    const { options, className, ...rest } = props;
    return (React.createElement("dl", { className: `flex flex-col space-y-4 ${className}`, ...rest }, options.map((option) => (React.createElement("span", { className: 'flex flex-row items-center', key: option.title },
        React.createElement("dt", { className: 'mr-8 w-5/12 text-left text-neutral-500/80' }, option.title),
        React.createElement("dd", { className: 'w-7/12 text-left font-bold tabular-nums text-neutral-700' }, option.details))))));
}
export { DescriptionList };
