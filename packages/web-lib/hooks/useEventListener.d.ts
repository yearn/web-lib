import type { RefObject } from 'react';
declare function useEventListener<TK extends keyof WindowEventMap>(eventName: TK, handler: (event: WindowEventMap[TK]) => void, element?: undefined, options?: boolean | AddEventListenerOptions): void;
declare function useEventListener<TK extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(eventName: TK, handler: (event: HTMLElementEventMap[TK]) => void, element: RefObject<T>, options?: boolean | AddEventListenerOptions): void;
declare function useEventListener<TK extends keyof DocumentEventMap>(eventName: TK, handler: (event: DocumentEventMap[TK]) => void, element: RefObject<Document>, options?: boolean | AddEventListenerOptions): void;
export default useEventListener;
