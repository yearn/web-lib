import React from 'react';
import {toast, useToasterStore} from 'react-hot-toast';
import IconAlertCritical from '@yearn-finance/web-lib/icons/IconAlertCritical';
import IconAlertError from '@yearn-finance/web-lib/icons/IconAlertError';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconCheckmark from '@yearn-finance/web-lib/icons/IconCheckmark';

import type {ReactElement} from 'react';
import type {ToastOptions} from 'react-hot-toast';

type TCTA = {
	label: string;
	onClick: () => void
};

type TUseToast = {
    content: string;
    type: 'error' | 'warning' | 'success' | 'info';
	cta?: TCTA;
} & ToastOptions;

function buildMessage({content, cta}: Pick<TUseToast, 'content' | 'cta'>): ReactElement {
	return (
		<div className={'flex items-center gap-2'}>
			{content}
			<button className={'yearn--toast-button'} onClick={cta?.onClick}>{cta?.label}</button>
		</div>
	);
}

export function yToast(): {toast: (props: TUseToast) => string, useToasterStore: typeof useToasterStore} {
	return {
		toast: ({content, type, cta, ...toastOptions}: TUseToast): string => {
			const message = cta ? buildMessage({content, cta}) : content;

			switch (type) {
			case 'error':
				return toast(message, {
					icon: <IconAlertCritical className={'ml-3'} />,
					style: {
						backgroundColor: '#C73203',
						color: 'white'
					},
					...toastOptions
				});
			case 'warning':
				return toast(message, {
					icon: <IconAlertWarning className={'ml-3'} />,
					style: {
						backgroundColor: '#FFDC53'
					},
					...toastOptions
				});
			case 'success':
				return toast(message, {
					icon: <IconCheckmark className={'ml-3'} />,
					style: {
						backgroundColor: '#00796D',
						color: 'white'
					},
					...toastOptions
				});
			case 'info':
				return toast(message, {
					icon: <IconAlertError className={'ml-3'} />,
					style: {
						backgroundColor: '#0657F9',
						color: 'white'
					},
					...toastOptions
				});
			default:
				return toast.success(content);
			}
		},
		useToasterStore
	};
}
