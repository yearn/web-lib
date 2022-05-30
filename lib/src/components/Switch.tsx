
import	React, {ReactElement}		from	'react';
import	{Switch as HeadlessSwitch}	from	'@headlessui/react';
import type * as SwitchTypes		from 	'./Switch.d';

function Switch({isEnabled, onSwitch}: SwitchTypes.TSwitch): ReactElement {
	return (
		<div>
			<HeadlessSwitch
				checked={isEnabled}
				onChange={onSwitch}
				onKeyDown={({keyCode}: {keyCode: number}) => keyCode === 13 ? onSwitch(s => !s) : null}
				className={`yearn--switch`}
			>
				<span className={'sr-only'}>{'Use setting'}</span>
				<div
					aria-hidden={'true'}
					className={isEnabled ? 'translate-x-4' : 'translate-x-0'} />
			</HeadlessSwitch>
		</div>
	);
}

export {Switch};