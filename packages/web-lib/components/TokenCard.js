import React from 'react';
import { Card } from '@yearn-finance/web-lib/components/Card';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';
function TokenCardBase(props) {
    const { label, value, imgSrc, onClick, className, ...rest } = props;
    const cardClassname = className || 'col-span-12 sm:col-span-6';
    return (React.createElement(Card, { className: cardClassname, padding: 'none', ...rest },
        React.createElement("button", { className: `rounded-default flex h-full w-full p-2 md:p-4 ${onClick ? 'hover:bg-neutral-100' : 'cursor-default'}`, onClick: onClick, tabIndex: onClick ? 0 : -1 },
            React.createElement("img", { alt: '', src: imgSrc, className: 'my-auto mr-4 h-16 w-16 select-none' }),
            React.createElement("div", { className: 'flex-col overflow-hidden text-left' },
                React.createElement("div", { className: 'mb-2 truncate text-sm text-neutral-500' }, label),
                React.createElement("div", { className: 'truncate text-xl font-bold tabular-nums text-neutral-700' }, value)),
            onClick && React.createElement(IconChevron, { className: 'my-auto ml-auto h-6 w-6 rotate-180 cursor-pointer' }))));
}
function Wrapper({ children }) {
    return (React.createElement("div", { className: 'grid grid-cols-12 gap-4' }, children));
}
export const TokenCard = Object.assign(TokenCardBase, { Wrapper });
