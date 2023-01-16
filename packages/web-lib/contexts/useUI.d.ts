import type { ReactElement } from 'react';
import type { TUIContext, TUIOptions } from './types';
export declare const UIContextApp: ({ children, options }: {
    children: ReactElement;
    options?: TUIOptions | undefined;
}) => ReactElement;
export declare const useUI: () => TUIContext;
export default useUI;
