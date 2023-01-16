import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useEventCallback from './useEventCallback';
import useEventListener from './useEventListener';
function useSessionStorage(key, initialValue) {
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item, (_, value) => {
                if (value?.type === 'BigNumber') {
                    return BigNumber.from(value);
                }
                return value;
            }) : initialValue;
        }
        catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);
    const [storedValue, set_storedValue] = useState(readValue);
    const assignValue = useEventCallback((value) => {
        if (typeof window == 'undefined') {
            console.warn(`Tried setting sessionStorage key “${key}” even though environment is not a client`);
        }
        try {
            const newValue = value instanceof Function ? value(storedValue) : value;
            window.sessionStorage.setItem(key, JSON.stringify(newValue));
            set_storedValue(newValue);
            window.dispatchEvent(new Event('session-storage'));
        }
        catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error);
        }
    });
    useEffect(() => {
        set_storedValue(readValue());
    }, []);
    const handleStorageChange = useCallback((event) => {
        if (event?.key && event.key !== key) {
            return;
        }
        set_storedValue(readValue());
    }, [key, readValue]);
    useEventListener('storage', handleStorageChange);
    useEventListener('session-storage', handleStorageChange);
    return [storedValue, assignValue];
}
export { useSessionStorage };
export default useSessionStorage;
