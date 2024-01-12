import actualAssert from 'assert';

export function assert(
	expression: unknown,
	message?: string | Error,
	doSomething?: (error: unknown) => void
): asserts expression {
	try {
		actualAssert(expression, message);
	} catch (error) {
		doSomething?.(error);
		throw error;
	}
}
