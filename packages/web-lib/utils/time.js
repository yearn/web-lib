export const SECOND = 1000;
export const DAY = SECOND * 3600 * 24;
export const WEEK = DAY * 7;
export const YEAR = DAY * 365;
export function toTime(time) {
    return Number(time || 0);
}
export function toMilliseconds(time) {
    return toTime(time) * SECOND;
}
export function toSeconds(time, floor = true) {
    const seconds = toTime(time) / SECOND;
    return floor ? Math.floor(seconds) : seconds;
}
export function toWeeks(time, floor = true) {
    const weeks = toTime(time) / WEEK;
    return floor ? Math.floor(weeks) : weeks;
}
export function fromWeeks(time) {
    return toTime(time) * WEEK;
}
export function getTimeUntil(time) {
    const duration = toTime(time) - Date.now();
    return duration < 0 ? 0 : duration;
}
export function roundToWeek(time) {
    return Math.floor(toTime(time) / WEEK) * WEEK;
}
