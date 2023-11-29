import {describe, expect, test} from 'bun:test';

import {
	DAY,
	fromWeeks,
	getTimeUntil,
	roundToWeek,
	SECOND,
	toMilliseconds,
	toSeconds,
	toTime,
	toWeeks,
	WEEK
} from './time.js';

import type {TMilliseconds} from '../../src/utils/time.js';

describe('timeUtils', (): void => {
	test('toTime', (): void => {
		expect(toTime(1000)).toBe(1000);
		expect(toTime('1000')).toBe(1000);
		expect(toTime(undefined)).toBe(0);
		expect(toTime('')).toBe(0);
		expect((): TMilliseconds => toTime('invalid')).toThrow('Invalid input: Cannot convert "invalid" to a number.');
	});

	test('toMilliseconds', (): void => {
		expect(toMilliseconds(1)).toBe(SECOND);
		expect(toMilliseconds(0)).toBe(0);
		expect(toMilliseconds(undefined)).toBe(0);
	});

	test('toSeconds', (): void => {
		expect(toSeconds(1000)).toBe(1);
		expect(toSeconds(1500, true)).toBe(1);
		expect(toSeconds(1500, false)).toBe(1.5);
		expect(toSeconds(0)).toBe(0);
		expect(toSeconds(undefined)).toBe(0);
	});

	test('toWeeks', (): void => {
		expect(toWeeks(WEEK)).toBe(1);
		expect(toWeeks(WEEK + DAY, true)).toBe(1);
		expect(toWeeks(WEEK + DAY, false)).toBeCloseTo(1.142857, 6);
		expect(toWeeks(0)).toBe(0);
		expect(toWeeks(undefined)).toBe(0);
	});

	test('fromWeeks', (): void => {
		expect(fromWeeks(1)).toBe(WEEK);
		expect(fromWeeks(2)).toBe(2 * WEEK);
		expect(fromWeeks(0)).toBe(0);
		expect(fromWeeks(undefined)).toBe(0);
	});

	test('getTimeUntil', (): void => {
		const futureTimestamp = Date.now() + 5000;
		const pastTimestamp = Date.now() - 5000;

		expect(getTimeUntil(futureTimestamp)).toBeGreaterThanOrEqual(4900);
		expect(getTimeUntil(pastTimestamp)).toBe(0);
		expect(getTimeUntil(0)).toBe(0);
		expect(getTimeUntil(undefined)).toBe(0);
	});

	test('roundToWeek', (): void => {
		const weekAndTwoDays = WEEK + DAY * 2;
		const roundedToWeek = roundToWeek(weekAndTwoDays);

		expect(roundedToWeek).toBe(WEEK);
		expect(roundToWeek(0)).toBe(0);
		expect(roundToWeek(undefined)).toBe(0);
	});
});
