import React from 'react';
import { toast as toastMaster, useToasterStore } from 'react-hot-toast';
import IconAlertCritical from '@yearn-finance/web-lib/icons/IconAlertCritical';
import IconAlertError from '@yearn-finance/web-lib/icons/IconAlertError';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconCheckmark from '@yearn-finance/web-lib/icons/IconCheckmark';
function buildMessage({ content, cta }) {
    return (React.createElement("div", { className: 'flex items-center gap-2' },
        content,
        React.createElement("button", { className: 'yearn--toast-button', onClick: cta?.onClick }, cta?.label)));
}
export function yToast() {
    return {
        toast: ({ content, type, cta, ...toastOptions }) => {
            const message = cta ? buildMessage({ content, cta }) : content;
            switch (type) {
                case 'error':
                    return toastMaster(message, {
                        icon: React.createElement(IconAlertCritical, { className: 'ml-3' }),
                        style: {
                            backgroundColor: '#C73203',
                            color: 'white'
                        },
                        ...toastOptions
                    });
                case 'warning':
                    return toastMaster(message, {
                        icon: React.createElement(IconAlertWarning, { className: 'ml-3' }),
                        style: {
                            backgroundColor: '#FFDC53'
                        },
                        ...toastOptions
                    });
                case 'success':
                    return toastMaster(message, {
                        icon: React.createElement(IconCheckmark, { className: 'ml-3' }),
                        style: {
                            backgroundColor: '#00796D',
                            color: 'white'
                        },
                        ...toastOptions
                    });
                case 'info':
                    return toastMaster(message, {
                        icon: React.createElement(IconAlertError, { className: 'ml-3' }),
                        style: {
                            backgroundColor: '#0657F9',
                            color: 'white'
                        },
                        ...toastOptions
                    });
                default:
                    return toastMaster.success(content);
            }
        },
        useToasterStore,
        toastMaster
    };
}
