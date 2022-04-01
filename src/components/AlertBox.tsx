import	React, {ReactElement}	from	'react';
import	IconAlertWarning		from	'../icons/IconAlertWarning';
import	IconAlertError			from	'../icons/IconAlertError';
import	IconAlertCritical		from	'../icons/IconAlertCritical';

type		TAlertLevels = 'none' | 'warning' | 'error' | 'critical';
type		TAlert = {level: TAlertLevels, message: string}
type 		TAlertBox = {alerts: TAlert[], level: TAlertLevels}
function	AlertBox({alerts, level = 'warning'}: TAlertBox): ReactElement | null {
	if (alerts.length === 0) {
		return null;
	}
	if (level === 'critical') {
		return (
			<div className={'flex flex-row items-start p-2 rounded-lg text-alert-critical-primary bg-alert-critical-secondary'}>
				<IconAlertCritical className={'w-5 h-5'} />
				<div className={'pl-2'}>
					{alerts.map((alert): ReactElement => (
						<div key={alert.message} className={'flex flex-row items-center'}>
							<p>{alert.message}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
	if (level === 'error') {
		return (
			<div className={'flex flex-row items-start p-2 rounded-lg text-alert-error-primary bg-alert-error-secondary'}>
				<IconAlertError className={'w-5 h-5'} />
				<div className={'pl-2'}>
					{alerts.map((alert): ReactElement => (
						<div key={alert.message} className={'flex flex-row items-center'}>
							<p>{alert.message}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
	return (
		<div className={'flex flex-row items-start p-2 rounded-lg text-alert-warning-primary bg-alert-warning-secondary'}>
			<IconAlertWarning className={'w-5 h-5'} />
			<div className={'pl-2'}>
				{alerts.map((alert): ReactElement => (
					<div key={alert.message} className={'flex flex-row items-center'}>
						<p>{alert.message}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export {AlertBox};