import React, { cloneElement, useState } from 'react';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';
function BannerBase(props) {
    const { title, children, primaryButton, secondaryButton } = props;
    return (React.createElement("div", { className: `yearn--banner ${props.className || ''}` },
        React.createElement("div", { className: 'yearn--banner-content-wrapper' },
            React.createElement("h4", { className: 'yearn--banner-content-title' }, title),
            React.createElement("div", { className: 'yearn--banner-content-text' }, children),
            primaryButton || secondaryButton ? (React.createElement("div", { className: 'yearn--banner-content-buttons' },
                primaryButton,
                secondaryButton)) : null)));
}
function BannerControlable(props) {
    const { children, onClose, canClose = true } = props;
    const [currentSlide, set_currentSlide] = useState(0);
    const [isVisible, set_isVisible] = useState(true);
    function onTryToClose() {
        if (onClose) {
            onClose();
        }
        else {
            set_isVisible(false);
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
    return (React.createElement("div", { className: 'yearn--banner-with-controls', style: isVisible ? {} : { display: 'none' } },
        canClose ? (React.createElement("button", { onClick: onTryToClose, className: 'absolute top-4 right-4 z-50' },
            React.createElement(IconCross, { className: 'yearn--banner-with-controls-icons-cross' }))) : null,
        cloneElement(children[currentSlide]),
        children.length > 1 ? (React.createElement("div", { className: 'yearn--banner-with-controls-pagination' },
            renderPreviousChevron(),
            React.createElement("p", { className: 'text-sm tabular-nums' }, `${currentSlide + 1}/${children.length}`),
            renderNextChevron())) : null));
}
export const Banner = Object.assign(BannerBase, {
    WithControls: BannerControlable
});
