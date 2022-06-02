import React from 'react';

const isBrowser = typeof window !== 'undefined';
const useClientEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

export {useClientEffect};
export default useClientEffect;
