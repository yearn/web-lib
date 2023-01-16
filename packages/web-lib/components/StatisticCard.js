import React from 'react';
import { Card } from '@yearn-finance/web-lib/components/Card';
function StatisticCardBase(props) {
    const { label, value, ...rest } = props;
    const className = rest.className || 'col-span-12 md:col-span-4';
    return (React.createElement(Card, { className: `flex flex-col ${className}`, padding: 'narrow', ...rest },
        React.createElement("div", { className: 'mb-2 text-sm text-neutral-500' }, label),
        React.createElement("div", { className: 'text-xl font-bold tabular-nums text-neutral-700' }, value)));
}
function Wrapper({ children }) {
    return (React.createElement("div", { className: 'grid grid-cols-12 gap-4' }, children));
}
export const StatisticCard = Object.assign(StatisticCardBase, { Wrapper });
