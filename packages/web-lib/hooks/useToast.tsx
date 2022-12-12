import React from 'react';
import {toast} from 'react-hot-toast';

import IconAlertCritical from '../icons/IconAlertCritical';
import IconAlertError from '../icons/IconAlertError';
import IconAlertWarning from '../icons/IconAlertWarning';
import IconCheckmark from '../icons/IconCheckmark';

type TCTA = {
	label: string;
	onClick: () => void
};

type TUseToast = {
    content: string;
    type: 'error' | 'warning' | 'success' | 'info';
	cta?: TCTA;
}

function getMessage({content, cta}: Pick<TUseToast, 'content' | 'cta'>) {
	if (!cta) {
		return content;
	}

	return (
		<div className='flex gap-2 items-center'>
			{content}
			<button className={'text-xs text-primary-500 bg-primary-100 ml-10 py-1 px-2'} onClick={cta.onClick}>{cta.label}</button>
		</div>
	);
}

export function useToast({content, type, cta}: TUseToast): () => string {
	const message = getMessage({content, cta});

	switch (type) {
	case 'error':
		return (): string => toast(message, {
			icon: <IconAlertCritical className={'ml-3'} />,
			style: {
				backgroundColor: '#C73203',
				color: 'white'
			}
		});
	case 'warning':
		return (): string => toast(message, {
			icon: <IconAlertWarning className={'ml-3'} />,
			style: {
				backgroundColor: '#FFDC53'
			}
		});
	case 'success':
		return (): string => toast(message, {
			icon: <IconCheckmark className={'ml-3'} />,
			style: {
				backgroundColor: '#00796D',
				color: 'white'
			}
		});
	case 'info':
		return (): string => toast(message, {
			icon: <IconAlertError className={'ml-3'} />,
			style: {
				backgroundColor: '#0657F9',
				color: 'white'
			}
		});
	default:
		return (): string => toast.success(content);
	}
}
