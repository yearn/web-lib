export function deepMerge(target: unknown, source: unknown): unknown {
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

const isObject = (input: unknown): input is { [key: string]: unknown } => {
	return typeof input === 'object' && input !== null && !Array.isArray(input);
};