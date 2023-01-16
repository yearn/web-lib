import { useEffect, useLayoutEffect } from 'react';
const isBrowser = typeof window !== 'undefined';
export const useClientEffect = isBrowser ? useLayoutEffect : useEffect;
