import React from 'react';
import {toast} from 'react-hot-toast';

import IconAlertCritical from '../icons/IconAlertCritical';
import IconAlertError from '../icons/IconAlertError';
import IconAlertWarning from '../icons/IconAlertWarning';
import IconCheckmark from '../icons/IconCheckmark';

type TUseToast = {
    content: string;
    type: 'error' | 'warning' | 'success' | 'info';
}

export function useToast({content, type}: TUseToast): () => string {
	switch (type) {
	case 'error':
		return (): string => toast(content, {
			icon: <IconAlertCritical className={'ml-3'} />,
			style: {
				backgroundColor: '#C73203',
				color: 'white'
			}
		});
	case 'warning':
		return (): string => toast(content, {
			icon: <IconAlertWarning className={'ml-3'} />,
			style: {
				backgroundColor: '#FFDC53'
			}
		});
	case 'success':
		return (): string => toast(content, {
			icon: <IconCheckmark className={'ml-3'} />,
			style: {
				backgroundColor: '#00796D',
				color: 'white'
			}
		});
	case 'info':
		return (): string => toast(content, {
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
