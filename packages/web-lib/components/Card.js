import React, { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Disclosure, Tab } from '@headlessui/react';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';
function CardDetailsSummary({ startChildren, endChildren, open, ...props }) {
    return (React.createElement("div", { className: 'yearn--card-details yearn--card-details-summary p-6 md:flex-row md:items-center', ...props },
        React.createElement("div", { className: 'w-inherit' }, startChildren),
        React.createElement("div", { className: 'mt-4 flex w-full flex-row items-center md:mt-0' },
            endChildren,
            React.createElement("div", { className: 'ml-auto' },
                React.createElement(IconChevron, { className: `text-primary-500 h-6 w-6 transition-transform ${open ? '-rotate-90' : '-rotate-180'}` })))));
}
function CardDetails(props) {
    const { summary, variant = 'surface', isSticky = true, children } = props;
    return (React.createElement(Disclosure, null, ({ open }) => (React.createElement("div", { className: `yearn--card-details yearn--card-details-disclosure ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'}` },
        React.createElement(Disclosure.Button, { as: 'div', role: 'button', tabIndex: 0, className: `yearn--card-details yearn--card-details-disclosure-button ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'} ${open ? '' : 'hover:bg-neutral-100'} ${isSticky ? 'relative top-0 md:sticky' : ''}` }, summary),
        React.createElement(AnimatePresence, { initial: false }, open && (React.createElement(motion.section, { key: 'content', initial: 'collapsed', animate: 'open', exit: 'collapsed', variants: { open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }, transition: { duration: 0.3, linear: true } },
            React.createElement(Disclosure.Panel, { static: true, className: `rounded-b-default w-full px-6 pb-6 ${variant === 'background' ? 'bg-neutral-200' : 'bg-neutral-0'}` }, children))))))));
}
function CardWithTabs(props) {
    const { tabs } = props;
    return (React.createElement("div", null,
        React.createElement(Tab.Group, null,
            React.createElement(Tab.List, { className: 'yearn--card yearn--card-tab', style: { padding: 0 } }, tabs.map((option) => (React.createElement(Tab, { key: option.label, as: 'div', className: ({ selected }) => `yearn--card-tab-item ${selected ? 'selected' : ''}` },
                React.createElement("p", { className: 'text-center text-lg' }, option.label))))),
            React.createElement(Tab.Panels, { className: 'w-full rounded-t-none' }, tabs.map((option) => (React.createElement(Tab.Panel, { key: option.label, as: Fragment },
                React.createElement("section", { className: 'yearn--card', style: {
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0
                    } }, option.children))))))));
}
function CardBase(props) {
    const { children, onClick, padding = 'regular', variant = 'surface', className, ...rest } = props;
    return (React.createElement("section", { role: onClick ? 'button' : undefined, "data-variant": variant, "data-padding": padding, className: `yearn--card ${className ? className : ''}`, onClick: onClick, ...rest }, children));
}
export { CardWithTabs };
export const Card = Object.assign(CardBase, {
    Detail: Object.assign(CardDetails, { Summary: CardDetailsSummary }),
    Tabs: CardWithTabs
});
