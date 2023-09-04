type TProps = bigint | number | string | null;

export function isZero(value?: TProps): boolean {
	if (value === null || value === undefined) {
		return false;
	}

	if (typeof value === 'string') {
		value = value.trim().replace(',', '.');

		if (value === '') {
			return false;
		}

		// Check if the string can be parsed as a floating-point number
		const parsed = Number(value);
		if (!isNaN(parsed)) {
			return parsed === 0;
		}
	}

	try {
		return BigInt(value) === 0n;
	} catch {
		return false;
	}
}
