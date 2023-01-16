import type { Dispatch, SetStateAction } from 'react';
export declare function useLocalStorage<T>(key: string, initialValue: T, options?: {
    currentVersion?: number;
    previousVersion?: number;
    shouldMigratePreviousVersion?: boolean;
}): [T, Dispatch<SetStateAction<T>>];
