
import	React, {ReactElement}		from	'react';
import	{Switch as HeadlessSwitch}	from	'@headlessui/react';
import type * as SwitchTypes		from 	'./Switch.d';

function Switch({isEnabled, onSwitch}: SwitchTypes.TSwitch): ReactElement {
	const	[isEnabledState, set_isEnabledState] = React.useState(isEnabled);

	function	safeOnSwitch(): void {
		if (onSwitch) {
			onSwitch(!isEnabled);
		} else {
			set_isEnabledState(!isEnabledState);
		}
	}

	return (
		<div>
			<HeadlessSwitch
				checked={onSwitch ? isEnabled : isEnabledState}
				onChange={safeOnSwitch}
				onKeyDown={({keyCode}: {keyCode: number}): unknown => keyCode === 13 ? safeOnSwitch() : null}
				className={'yearn--switch'}>
				<span className={'sr-only'}>{'Use setting'}</span>
				<div
					aria-hidden={'true'}
					className={(onSwitch ? isEnabled : isEnabledState) ? 'translate-x-4' : 'translate-x-0'} />
			</HeadlessSwitch>
		</div>
	);
}

export {Switch};