import	React, {ReactElement}	from	'react';
import	IconAlertWarning		from	'../icons/IconAlertWarning';
import	IconAlertError			from	'../icons/IconAlertError';
import	IconAlertCritical		from	'../icons/IconAlertCritical';
import type * as AlertTypes		from	'./Alert.d';

function	AlertBox({
	alerts,
	level = 'warning'
}: AlertTypes.TAlertBox): ReactElement | null {
	function	renderIcon(): ReactElement {
		if (level === 'critical')
			return (<IconAlertCritical className={'yearn--alertbox-icon'} />);
		if (level === 'error')
			return (<IconAlertError className={'yearn--alertbox-icon'} />);
		if (level === 'warning')
			return (<IconAlertWarning className={'yearn--alertbox-icon'} />);
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