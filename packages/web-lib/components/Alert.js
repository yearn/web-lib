import React, { useEffect, useState } from 'react';
import IconAlertCritical from '@yearn-finance/web-lib/icons/IconAlertCritical';
import IconAlertError from '@yearn-finance/web-lib/icons/IconAlertError';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
export function Alert() {
    throw new Error('Please use `Alert.Banner` or `Alert.Box` instead');
}
function AlertBanner(props) {
    const { title, children, level = 'info', maxHeight = 'max-h-[300px]', canClose = true, isVisible = true, onClose } = props;
    const [shouldRender, set_shouldRender] = useState(isVisible);
    const [isLocalVisible, set_isLocalVisible] = useState(isVisible);
    const [currentSlide, set_currentSlide] = useState(0);
    const hasSlide = children.type === undefined;
    const infoClassName = 'text-primary-500 bg-primary-100 border-primary-500';
    const warningClassName = 'text-yellow-900 bg-yellow-300 border-yellow-900';
    const errorClassName = 'text-pink-900 bg-pink-300 border-pink-900';
    const criticalClassName = 'text-red-900 bg-red-300 border-red-900';
    const alertClassName = level === 'critical' ? criticalClassName : level === 'warning' ? warningClassName : level === 'error' ? errorClassName : infoClassName;
    useEffect(() => {
        if (isVisible) {
            performBatchedUpdates(() => {
                set_isLocalVisible(true);
                set_shouldRender(true);
            });
        }
        else {
            set_isLocalVisible(false);
            setTimeout(() => set_shouldRender(false), 650);
        }
    }, [isVisible]);
    function onTryToClose() {
        if (onClose) {
            onClose();
        }
        else {
            set_isLocalVisible(false);
            setTimeout(() => set_shouldRender(false), 650);
        }
    }
    function renderPreviousChevron() {
        if (currentSlide === 0) {
            return (React.createElement(IconChevron, { className: 'h-4 w-4 cursor-not-allowed opacity-50' }));
        }
        return (React.createElement(IconChevron, { className: 'h-4 w-4 cursor-pointer', onClick: () => set_currentSlide(currentSlide - 1) }));
    }
    function renderNextChevron() {
        if (currentSlide === children.length - 1) {
            return (React.createElement(IconChevron, { className: 'h-4 w-4 rotate-180 cursor-not-allowed opacity-50' }));
        }
        return (React.createElement(IconChevron, { className: 'h-4 w-4 rotate-180 cursor-pointer', onClick: () => set_currentSlide(currentSlide + 1) }));
    }
    if (!shouldRender && canClose) {
        return React.createElement("div", null);
    }
    return (React.createElement("div", { className: `transition-max-height duration-600 overflow-hidden ${isLocalVisible ? maxHeight : 'max-h-0'}` },
        React.createElement("div", { className: `alertBanner--wrapper rounded-default relative flex flex-col border-2 p-6 ${alertClassName} ${hasSlide ? 'pb-8' : 'pb-6'}` },
            canClose ? (React.createElement("button", { onClick: onTryToClose, className: 'absolute top-4 right-4' },
                React.createElement(IconCross, { className: 'h-6 w-6 cursor-pointer' }))) : null,
            React.createElement("h4", { className: 'mb-6 text-inherit' }, title),
            hasSlide ? children[currentSlide] : children,
            hasSlide ? (React.createElement("div", { className: 'absolute right-4 bottom-2 flex flex-row items-center space-x-2' },
                renderPreviousChevron(),
                React.createElement("p", { className: 'text-sm tabular-nums' }, `${currentSlide + 1}/${children.length}`),
                renderNextChevron())) : null)));
}
Alert.Banner = AlertBanner;
function AlertBox(props) {
    const { alerts, level = 'warning' } = props;
    function renderIcon() {
        if (level === 'critical') {
            return (React.createElement(IconAlertCritical, { className: 'yearn--alertbox-icon' }));
        }
        if (level === 'error') {
            return (React.createElement(IconAlertError, { className: 'yearn--alertbox-icon' }));
        }
        if (level === 'warning') {
            return (React.createElement(IconAlertWarning, { className: 'yearn--alertbox-icon' }));
        }
        return (React.createElement(IconAlertWarning, { className: 'yearn--alertbox-icon' }));
    }
    if (alerts.length === 0) {
        return null;
    }
    return (React.createElement("div", { "data-variant": level, className: 'yearn--alertbox' },
        renderIcon(),
        React.createElement("div", null, alerts.map((alert) => (React.createElement("div", { key: alert, className: 'flex flex-row items-center' },
            React.createElement("p", null, alert)))))));
}
Alert.Box = AlertBox;
export default Alert;
