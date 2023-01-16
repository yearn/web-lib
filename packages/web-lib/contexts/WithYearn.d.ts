import type { ReactElement } from 'react';
import type { TSettingsBase, TSettingsOptions, TUIOptions, TWeb3Options } from './types';
declare function WithYearn({ children, options }: {
    children: ReactElement;
    options?: {
        ui?: TUIOptions;
        web3?: TWeb3Options;
        networks?: TSettingsOptions;
        baseSettings?: Partial<TSettingsBase>;
    };
}): ReactElement;
export { WithYearn };
