import React, {ReactElement} from 'react';
import {type Toast, toast} from 'react-hot-toast';

import IconAlertError from '../icons/IconAlertError';
import IconAlertWarning from '../icons/IconAlertWarning';
import IconCheckmark from '../icons/IconCheckmark';
import IconCross from '../icons/IconCross';

type TUseToast = {
    content: string;
    type: 'error' | 'warning' | 'success' | 'info';
}

function BaseToast({t, content}: {t: Toast, content: string}): ReactElement {
	return (
		<span className={'flex flex-row bg-black'}>
			<span className={'self-center'}>{content}</span>
			<IconCross
				width={16}
				height={16}
				onClick={(): void => toast.dismiss(t.id)}
				className={'ml-3 cursor-pointer'} />
		</span>
	);
}

export function useToast({content, type}: TUseToast): () => string {
	switch (type) {
	case 'error':
		return (): string => toast((t): ReactElement => <BaseToast t={t} content={content} />, {
			icon: <IconAlertError className={'ml-120'} />,
			style: {
				backgroundColor: '#f2c6c3',
				color: '#b92a2c'
			}
		});
	case 'warning':
		return (): string => toast((t): ReactElement => <BaseToast t={t} content={content} />, {
			icon: <IconAlertWarning />,
			style: {
				backgroundColor: '#ffeb9a',
				color: '#ff3700'
			}
		});
	case 'success':
		return (): string => toast((t): ReactElement => <BaseToast t={t} content={content} />, {
			icon: <IconCheckmark />,
			style: {
				backgroundColor: '#d8f3d2',
				color: '#526c4c'
			}
		});
	case 'info':
		return (): string => toast((t): ReactElement => <BaseToast t={t} content={content} />, {
			icon: <IconAlertWarning />,
			style: {
				backgroundColor: '#c4e8f6',
				color: '#2b749a'
			}
		});
	default:
		return (): string => toast.success(content);
	}
}
