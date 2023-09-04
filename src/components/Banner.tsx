import React from 'react';

import {IconAlertWarning} from '../icons/IconAlertWarning.js';
import {IconCross} from '../icons/IconCross.js';
import {cl} from '../utils/cl.js';

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
			<IconAlertWarning className={'ml-3 mr-2 w-4 min-w-[16px] md:mr-0 md:w-6 md:min-w-[24px]'} />
			<p className={'text-sm md:text-base'}>{content}</p>
			<IconCross
				className={'hidden cursor-pointer text-white md:right-3 md:top-4 md:block'}
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
