import dayjs, { extend } from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
extend(relativeTime);
extend(dayjsDuration);
export function date(value, withDate = true, separator = '/') {
    let locale = 'fr-FR';
    if (typeof (navigator) !== 'undefined') {
        locale = navigator.language || 'fr-FR';
    }
    let formatedDate = new Intl.DateTimeFormat([locale, 'en-US'], {
        dateStyle: 'short',
        timeStyle: 'short',
        hourCycle: 'h24'
    }).format(value);
    if (!withDate) {
        formatedDate = (new Intl.DateTimeFormat([locale, 'en-US'], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).format(value));
    }
    if (separator !== '/') {
        formatedDate = formatedDate.replace(/\//g, separator);
    }
    return formatedDate;
}
export function since(value) {
    return dayjs(value).from(dayjs());
}
export function duration(value, withSuffix) {
    return dayjs.duration(value, 'milliseconds').humanize(withSuffix);
}
export { date as formatDate };
export { since as formatSince };
export { duration as formatDuration };
