import React, {ReactElement} from 'react';
import IconAlertCritical from '@majorfi/web-lib/icons/IconAlertCritical';
import IconAlertError from '@majorfi/web-lib/icons/IconAlertError';
import IconAlertWarning from '@majorfi/web-lib/icons/IconAlertWarning';

import type	{TAlertBox} from './Alert.d';

function	AlertBox(props: TAlertBox): ReactElement | null {
	const {alerts, level = 'warning'} = props;

	function	renderIcon(): ReactElement {
		if (level === 'critical') {
			return (<IconAlertCritical className={'yearn--alertbox-icon'} />);
		}
		if (level === 'error') {
			return (<IconAlertError className={'yearn--alertbox-icon'} />);
		}
		if (level === 'warning') {
			return (<IconAlertWarning className={'yearn--alertbox-icon'} />);
		}
		return (<IconAlertWarning className={'yearn--alertbox-icon'} />);
	}

	if (alerts.length === 0) {
		return null;
	}

	return (
		<div
			data-variant={level}
			className={'yearn--alertbox'}>
			{renderIcon()}
			<div>
				{alerts.map((alert): ReactElement => (
					<div key={alert} className={'flex flex-row items-center'}>
						<p>{alert}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export {AlertBox};