export default function useEventCallback<TArgs extends unknown[], TR>(fn: (...args: TArgs) => TR): (...args: TArgs) => TR;
