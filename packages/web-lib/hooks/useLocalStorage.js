import { useState } from 'react';
import { BigNumber } from 'ethers';
export function useLocalStorage(key, initialValue, options) {
    const [storedValue, set_storedValue] = useState(() => {
        const _key = options?.currentVersion ? `${key}${options.currentVersion}` : key;
        try {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            const previousKey = options?.previousVersion !== undefined ? `${key}${options.previousVersion}` : key;
            const previousItem = window.localStorage.getItem(previousKey);
            const item = window.localStorage.getItem(_key);
            if (previousItem && options?.shouldMigratePreviousVersion) {
                const resp = (JSON.parse(previousItem, (_key, value) => {
                    if (value?.type === 'BigNumber') {
                        return BigNumber.from(value);
                    }
                    return value;
                }));
                window.localStorage.setItem(_key, JSON.stringify(initialValue));
                window.localStorage.removeItem(key);
                return resp;
            }
            if (item !== null) {
                return (JSON.parse(item, (_key, value) => {
                    if (value?.type === 'BigNumber') {
                        return BigNumber.from(value);
                    }
                    return value;
                }));
            }
            return initialValue;
        }
        catch (error) {
            console.warn(error);
            return initialValue;
        }
    });
    const set_value = (value) => {
        const _key = options?.currentVersion ? `${key}-${options.currentVersion}` : key;
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            set_storedValue(valueToStore);
            window.localStorage.setItem(_key, JSON.stringify(valueToStore));
        }
        catch (error) {
            console.warn(error);
        }
    };
    return [storedValue, set_value];
}
