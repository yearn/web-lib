import React from 'react';
import IconAlertWarning from '@yearn-finance/web-lib/icons/IconAlertWarning';
import IconCross from '@yearn-finance/web-lib/icons/IconCross';

import type {ReactElement} from 'react';

type TBannerProps = {
	content: string;
	type: 'error' | 'warning' | 'success' | 'info';
	onClose: () => void
};

export function Banner({content, type, onClose}: TBannerProps): ReactElement {
	const {backgroundColor, color} = getColors(type);
	
	return (
		// eslint-disable-next-line tailwindcss/classnames-order
		<div className={`bg-[${backgroundColor}] flex justify-between p-2 text-${color}`}>
			<IconAlertWarning className={'ml-3'} />
			<p className={'text-base'}>{content}</p>
			<IconCross
				className={'cursor-pointer text-white md:right-3 md:top-4'}
				onClick={onClose}
			/>
		</div>
	);
}

function getColors(type: TBannerProps['type']): {backgroundColor: string; color: string} {
	switch (type) {
		case 'error':
			return {backgroundColor: '#C73203', color: 'white'};
		case 'warning':
			return {backgroundColor: '#FFDC53', color: 'black'};
		case 'success':
			return {backgroundColor: '#00796D', color: 'white'};
		default:
			return {backgroundColor: '#0657F9', color: 'white'};
	}
}
