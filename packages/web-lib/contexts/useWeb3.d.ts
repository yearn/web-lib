import type { ReactElement } from 'react';
import type { TWeb3Context, TWeb3Options } from './types';
export declare const Web3ContextApp: ({ children, options }: {
    children: ReactElement;
    options?: TWeb3Options | undefined;
}) => ReactElement;
export declare const useWeb3: () => TWeb3Context;
export default useWeb3;
