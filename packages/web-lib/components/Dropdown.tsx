import React, {cloneElement, Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import IconChevron from '@yearn-finance/web-lib/icons/IconChevron';

import type {ReactElement} from 'react';

export type TDropdownOption = {
	icon?: ReactElement;
	value: string | number;
	label: string;
};

export type TDropdownProps = {
	options: TDropdownOption[];
	defaultOption: TDropdownOption;
	selected: TDropdownOption;
	onSelect:
	| React.Dispatch<React.SetStateAction<TDropdownOption>>
	| ((option: TDropdownOption) => void);
};

function Dropdown(props: TDropdownProps): ReactElement {
	const {options, defaultOption, selected, onSelect} = props;

	return (
		<div>
			<Menu as={'menu'} className={'relative inline-block text-left'}>
				{({open}): ReactElement => (
					<>
						<Menu.Button
							data-variant={'light'}
							className={'yearn--button flex items-center justify-between'}>
							<div className={'flex flex-row items-center'}>
								{selected?.icon ? cloneElement(selected.icon, {className: 'w-5 h-5 mr-2 min-w-[24px]'}) : null}
								<p className={'font-roboto font-normal text-inherit'}>{selected?.label || defaultOption.label}</p>
							</div>
							<IconChevron className={`ml-3 h-4 w-4 transition-transform ${open ? '-rotate-90' : '-rotate-180'}`} />
						</Menu.Button>
						<Transition
							as={Fragment}
							show={open}
							enter={'transition duration-100 ease-out'}
							enterFrom={'transform scale-95 opacity-0'}
							enterTo={'transform scale-100 opacity-100'}
							leave={'transition duration-75 ease-out'}
							leaveFrom={'transform scale-100 opacity-100'}
							leaveTo={'transform scale-95 opacity-0'}>
							<Menu.Items className={'yearn--dropdown-menu'}>
								{options.map((option): ReactElement => (
									<Menu.Item key={option.value}>
										{({active}): ReactElement => (
											<div
												onClick={(): void => onSelect(option)}
												data-active={active}
												className={'yearn--dropdown-menu-item'}>
												{option.icon ? cloneElement(option.icon, {className: 'w-5 h-5 mr-2 min-w-[24px]'}) : null}
												<p>{option.label}</p>
											</div>
										)}
									</Menu.Item>
								))}
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</div>
	);
}

export {Dropdown};
