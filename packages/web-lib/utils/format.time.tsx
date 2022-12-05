import dayjs, {extend} from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';

extend(relativeTime);
extend(dayjsDuration);

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function using the power of the browsers and standard functions
** to correctly format date
**************************************************************************/
export function	date(value: number, withDate = true): string {
	if (withDate) {
		return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', timeStyle: 'short', hourCycle: 'h24'}).format(value));
	}
	return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', hourCycle: 'h24'}).format(value));
}

export function	since(value: number): string {
	return dayjs(value).from(dayjs());
}

export function	duration(value: number, withSuffix?: boolean): string {
	return dayjs.duration(value, 'milliseconds').humanize(withSuffix);
}

export {date as formatDate};
export {since as formatSince};
export {duration as formatDuration};