import { useEffect, useState } from 'react';
export function useDebounce(value, delay) {
    const [debouncedValue, set_debouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            set_debouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export { useDebouncedCallback } from '@react-hookz/web/cjs/useDebouncedCallback';
export { useDebouncedEffect } from '@react-hookz/web/cjs/useDebouncedEffect';
export { useDebouncedState } from '@react-hookz/web/cjs/useDebouncedState';
