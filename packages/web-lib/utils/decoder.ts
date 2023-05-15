
type TUnknowValueType = {
	error: Error;
	result?: undefined;
	status: 'failure';
} | {
	error?: undefined;
	result: unknown;
	status: 'success';
}
export function decodeAsBigInt(value: TUnknowValueType, defaultValue = 0n): bigint {
	if (value.status === 'failure') {
		return defaultValue;
	}
	try {
		return BigInt(value.result as bigint);
	} catch (error) {
		return defaultValue;
	}
}

export function decodeAsString(value: TUnknowValueType, defaultValue = ''): string {
	if (value.status === 'failure') {
		return defaultValue;
	}
	try {
		return value.result as string;
	} catch (error) {
		return defaultValue;
	}
}

export function decodeAsNumber(value: TUnknowValueType, defaultValue = 0): number {
	if (value.status === 'failure') {
		return defaultValue;
	}
	try {
		return Number(value.result as number);
	} catch (error) {
		return defaultValue;
	}
}
