import { useEffect, useRef } from 'react';
export function useInterval(callback, delay = 1000, runOnLoad = false, effectDependencies = []) {
    const savedCallback = useRef();
    useEffect(() => {
        if (runOnLoad) {
            callback();
        }
    }, [...effectDependencies]);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay, ...effectDependencies]);
}
