import React from 'react';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';

import {cl} from '../utils/cl';

import type {ReactElement} from 'react';

type TBannerProps = {
	content: string;
	type: 'error' | 'warning' | 'success' | 'info';
	onClose: () => void
};

export function Banner({content, type, onClose}: TBannerProps): ReactElement {
	const colorClassName = getClassName(type);

	return (
		<div className={cl('flex justify-between p-2', colorClassName)}>
			<IconAlertWarning className={'ml-3'} />
			<p className={'text-base'}>{content}</p>
			<IconCross
				className={'cursor-pointer text-white md:right-3 md:top-4'}
				onClick={onClose}
			/>
		</div>
	);
}

function getClassName(type: TBannerProps['type']): string {
	switch (type) {
		case 'error':
			return 'bg-[#C73203] text-[#FFFFFF]';
		case 'warning':
			return 'bg-[#FFDC53] text-[#000000]';
		case 'success':
			return 'bg-[#00796D] text-[#FFFFFF]';
		default:
			return 'bg-[#0657F9] text-[#FFFFFF]';
	}
}
