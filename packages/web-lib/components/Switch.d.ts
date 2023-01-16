import React from 'react';
import type { ReactElement } from 'react';
export type TSwitch = {
    isEnabled: boolean;
    onSwitch?: React.Dispatch<React.SetStateAction<boolean>>;
};
declare function Switch(props: TSwitch): ReactElement;
export { Switch };
