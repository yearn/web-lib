import	React, {ReactElement}	from	'react';
import	IconAlertWarning		from	'../icons/IconAlertWarning';
import	IconAlertError			from	'../icons/IconAlertError';
import	IconAlertCritical		from	'../icons/IconAlertCritical';
import type * as AlertTypes		from	'./Alert.d';

function	AlertBox({
	alerts,
	level = 'warning'
}: AlertTypes.TAlertBox): ReactElement | null {
	const	infoClassName = 'text-primary bg-secondary';
	const	warningClassName = 'text-alert-warning-primary bg-alert-warning-secondary';
	const	errorClassName = 'text-alert-error-primary bg-alert-error-secondary';
	const	criticalClassName = 'text-alert-critical-primary bg-alert-critical-secondary';
	const	alertClassName = `flex flex-row items-start p-2 rounded-lg ${level === 'critical' ? criticalClassName : level === 'warning' ? warningClassName : level === 'error' ? errorClassName : infoClassName}`;

	function	renderIcon(): ReactElement {
		if (level === 'critical')
			return (<IconAlertCritical className={'w-5 h-5'} />);
		if (level === 'error')
			return (<IconAlertError className={'w-5 h-5'} />);
		if (level === 'warning')
			return (<IconAlertWarning className={'w-5 h-5'} />);
		return (<IconAlertWarning className={'w-5 h-5'} />);
	}

	if (alerts.length === 0) {
		return null;
	}
	return (
		<div className={alertClassName}>
			{renderIcon()}
			<div className={'pl-2'}>
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