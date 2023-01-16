import { useEffect, useState } from 'react';
export const useWindowInFocus = () => {
    const [isFocused, set_isFocused] = useState(true);
    useEffect(() => {
        const onFocus = () => set_isFocused(true);
        const onBlur = () => set_isFocused(false);
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);
    return isFocused;
};
