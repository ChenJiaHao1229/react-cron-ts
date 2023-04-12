"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var en = {
    second: {
        name: 'Second',
        every: 'Every second',
        circle: ['Starting from the', 'th second, execute once every', 'seconds'],
        cycle: ['Execute once per second from', 'seconds to', 'seconds'],
        specific: 'Specific time (seconds)'
    },
    minute: {
        name: 'Minute',
        every: 'Every minute',
        circle: ['Starting from the', 'th minute, execute once every', 'minutes'],
        cycle: ['Execute once per minute from', 'minutes to', 'minutes'],
        specific: 'Specific time (minutes)'
    },
    hour: {
        name: 'Hour',
        every: 'Every hour',
        circle: ['Starting from the', 'th hour, execute once every', 'hours'],
        cycle: ['Execute once per hour from', 'hours to', 'hours'],
        specific: 'Specific time (hours)'
    },
    day: {
        name: 'Day&Week',
        oneDay: ['Every day', 'The last day of the month', 'The last working day of the month'],
        lastDay: ['The', 'th day from the end of this month'],
        workDay: ['The nearest working day to the ', 'th day of this month'],
        circle: ['Starting from the', 'th day, execute once every', 'days'],
        cycle: ['Execute once per day from', 'days to', 'days'],
        startWeek: ['Starting on', 'Wednesday, execute once every', 'days'],
        specific: 'Specific time (days)',
        specificWeek: 'Specific time (weeks)',
        lastWeek: ['The last', 'of this month'],
        conWeek: ['The', 'rd', 'of this month']
    },
    Week: [
        { label: 'Sunday', value: 1, name: 'SUN' },
        { label: 'Monday', value: 2, name: 'MON' },
        { label: 'Tuesday', value: 3, name: 'TUE' },
        { label: 'Wednesday', value: 4, name: 'WED' },
        { label: 'Thursday', value: 5, name: 'THU' },
        { label: 'Friday', value: 6, name: 'FRI' },
        { label: 'Saturday', value: 7, name: 'SAT' }
    ],
    month: {
        name: 'Month',
        every: 'Every month',
        circle: ['Starting from the', 'th month, execute once every', 'months'],
        cycle: ['Execute once per month from', 'months to', 'months'],
        specific: 'Specific time (months)'
    },
    year: {
        name: 'Year',
        every: 'Any year',
        circle: ['Starting from the', 'th year, execute once every', 'years'],
        cycle: ['Execute once per year from', 'years to', 'years'],
        specific: 'Specific time (years)'
    },
    save: 'Save',
    close: 'Close',
    placeholder: 'Please select',
    language: [
        { label: 'CN', value: 'cn' },
        { label: 'EN', value: 'en' }
    ]
};
exports.default = en;
