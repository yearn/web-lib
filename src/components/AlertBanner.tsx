

import	React, {ReactElement}	from	'react';
import	IconCross				from	'../icons/IconCross';
import	IconChevron				from	'../icons/IconChevron';

type		TAlertLevels = 'none' | 'info' | 'warning' | 'error' | 'critical';
type		TAlertBanner = {
	level: TAlertLevels,
	title: string,
	children: ReactElement | ReactElement[]
}
function	AlertBanner({level = 'info', title, children}: TAlertBanner): ReactElement {
	const	[isVisible, set_isVisible] = React.useState(true);
	const	[currentSlide, set_currentSlide] = React.useState(0);
	const	hasSlide = (children as ReactElement).type === undefined;
	const	infoClassName = 'text-primary bg-secondary border-primary';
	const	warningClassName = 'text-alert-warning-primary bg-alert-warning-secondary border-alert-warning-primary';
	const	errorClassName = 'text-alert-error-primary bg-alert-error-secondary border-alert-error-primary';
	const	criticalClassName = 'text-alert-critical-primary bg-alert-critical-secondary border-alert-critical-primary';
	const	alertClassName = level === 'critical' ? criticalClassName : level === 'warning' ? warningClassName : level === 'error' ? errorClassName : infoClassName


	function	renderPreviousChevron(): ReactElement {
		if (currentSlide === 0) {
			return (
				<IconChevron className={'w-4 h-4 opacity-50 cursor-not-allowed text-primary'} />
			);
		}
		return (
			<IconChevron
				className={'w-4 h-4 cursor-pointer text-primary'}
				onClick={(): void => set_currentSlide(currentSlide - 1)} />
		);
	}

	function	renderNextChevron(): ReactElement {
		if (currentSlide === (children as ReactElement[]).length - 1) {
			return (
				<IconChevron className={'w-4 h-4 opacity-50 rotate-180 cursor-not-allowed text-primary'} />
			);
		}
		return (
			<IconChevron
				className={'w-4 h-4 rotate-180 cursor-pointer text-primary'}
				onClick={(): void => set_currentSlide(currentSlide + 1)} />
		);
	}

	if (!isVisible) {
		return <div />;
	}
	return (
		<div className={`flex relative flex-col p-6 mb-4 rounded-lg border-2 ${alertClassName} ${hasSlide ? 'pb-8' : 'pb-6'}`}>
			<div className={'absolute top-4 right-4'}>
				<IconCross className={'w-6 h-6 cursor-pointer'} onClick={(): void => set_isVisible(false)} />
			</div>
			<h4 className={'mb-6 text-inherit'}>{title}</h4>
			{hasSlide ? (children as ReactElement[])[currentSlide] : children}
			{hasSlide ? <div className={'flex absolute right-4 bottom-2 flex-row items-center space-x-2'}>
				{renderPreviousChevron()}
				<p className={'text-sm tabular-nums'}>{`${currentSlide + 1}/${(children as ReactElement[]).length}`}</p>
				{renderNextChevron()}
			</div> : null}
		</div>
	);
}

export {AlertBanner};