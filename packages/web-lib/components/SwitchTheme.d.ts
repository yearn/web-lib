import React from 'react';
import type { ReactElement } from 'react';
export type TSwitchTheme = {
    theme: string;
    switchTheme: () => void;
} & React.ComponentPropsWithoutRef<'div'>;
declare function SwitchTheme(props: TSwitchTheme): ReactElement;
export { SwitchTheme };
