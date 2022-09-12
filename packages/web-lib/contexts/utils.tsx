export function deepMerge(target: any, source: any): unknown {
	const isObject = (obj: any): boolean => obj && typeof obj === 'object';

	if (!isObject(target) || !isObject(source)) {
		return target;
	}

	Object.keys(target).forEach((key: string | number): void => {
		const targetValue = target[key];
		target[key] = targetValue;
	});

	Object.keys(source).forEach((key: string | number): void => {
		const targetValue = target[key];
		const sourceValue = source[key];

		if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
			target[key] = sourceValue; //no concat, replace
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
		} else {
			target[key] = sourceValue;
		}
	});

	return target;
}