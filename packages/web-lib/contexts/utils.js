export function deepMerge(target, source) {
    if (!isObject(target) || !isObject(source)) {
        return target;
    }
    Object.keys(target).forEach((key) => {
        const targetValue = target[key];
        target[key] = targetValue;
    });
    Object.keys(source).forEach((key) => {
        const targetValue = target[key];
        const sourceValue = source[key];
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = sourceValue;
        }
        else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
        }
        else {
            target[key] = sourceValue;
        }
    });
    return target;
}
const isObject = (input) => {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
};
