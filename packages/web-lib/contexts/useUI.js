import React, { createContext, Fragment, useCallback, useContext, useMemo, useRef } from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import { deepMerge } from '@yearn-finance/web-lib/contexts//utils';
import IconCross from '../icons/IconCross';
const defaultOptions = {
    shouldUseDefaultToaster: true
};
const UI = createContext({
    toast,
    onLoadStart: NProgress.start,
    onLoadDone: NProgress.done
});
export const UIContextApp = ({ children, options = defaultOptions }) => {
    const uiOptions = deepMerge(defaultOptions, options);
    const nsRefCount = useRef(0);
    function renderToaster() {
        if (uiOptions.shouldUseDefaultToaster) {
            return (React.createElement(Toaster, { containerClassName: '!z-[1000000]', gutter: 0, position: 'bottom-center', containerStyle: {
                    zIndex: 1000000,
                    width: '100%',
                    bottom: 0,
                    left: 0,
                    right: 0
                }, toastOptions: {
                    className: 'yearn--toast-options'
                } }, (t) => (React.createElement(ToastBar, { toast: t, position: 'bottom-center' }, ({ icon, message }) => (React.createElement(React.Fragment, null,
                icon,
                message,
                t.type !== 'loading' ? (React.createElement(IconCross, { width: 16, height: 16, onClick: () => toast.dismiss(t.id), className: 'mr-3 cursor-pointer' })) : null))))));
        }
        return React.createElement(Fragment, null);
    }
    const onLoadStart = useCallback(() => {
        if (nsRefCount.current === 0) {
            NProgress.start();
        }
        nsRefCount.current += 1;
    }, []);
    const onLoadDone = useCallback(() => {
        if (nsRefCount.current === 0) {
            NProgress.done();
            return;
        }
        nsRefCount.current -= 1;
        if (nsRefCount.current === 0) {
            NProgress.done();
        }
    }, []);
    const contextValue = useMemo(() => ({
        toast,
        onLoadStart,
        onLoadDone
    }), [onLoadStart, onLoadDone]);
    return (React.createElement(UI.Provider, { value: contextValue },
        renderToaster(),
        children));
};
export const useUI = () => useContext(UI);
export default useUI;
