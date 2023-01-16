import type { Dispatch, SetStateAction } from 'react';
declare global {
    interface WindowEventMap {
        'session-storage': CustomEvent;
    }
}
type TSetValue<T> = Dispatch<SetStateAction<T>>;
declare function useSessionStorage<T>(key: string, initialValue: T): [T, TSetValue<T>];
export { useSessionStorage };
export default useSessionStorage;
