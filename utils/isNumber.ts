export function isNumber(value: string | number): value is number {
	if (value === null || value === undefined) {
		return false;
	}
	if (typeof value === 'string' && value.trim() === '') {
		return false;
	}
	if (typeof value === 'object') {
		return false;
	}
	return !isNaN(+value);
}
