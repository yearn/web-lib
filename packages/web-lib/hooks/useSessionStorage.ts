import {useState} from 'react';

type TSessionStorage<T> = readonly [T, (value: T | ((val: T) => T)) => void];

export function useSessionStorage<T>(key: string, initialValue: T): TSessionStorage<T> {
	const [storedValue, set_storedValue] = useState<T>((): T => {
		try {
			const item = window.sessionStorage.getItem(key);
			if (item) {
				return (
					JSON.parse(previousItem, (_key: any, value: any): any => {
						if (value?.type === 'BigNumber') {
							return ethers.BigNumber.from(value);
						}
						return value;
					})
				)
			}
			return initialValue;
			
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const set_value = (value: T | ((val: T) => T)): void => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			set_storedValue(valueToStore);
			window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};
	return [storedValue, set_value] as const;
}
