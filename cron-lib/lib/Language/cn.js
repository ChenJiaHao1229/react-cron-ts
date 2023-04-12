"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cn = {
    second: {
        name: '秒',
        every: '每一秒钟',
        circle: ['从第', '秒开始，每隔', '秒执行一次'],
        cycle: ['从第', '秒，到第', '秒，每秒执行一次'],
        specific: '具体时间(秒)'
    },
    minute: {
        name: '分',
        every: '每一分钟',
        circle: ['从第', '分钟开始，每隔', '分钟执行一次'],
        cycle: ['从第', '分钟，到第', '分钟，每分钟执行一次'],
        specific: '具体时间(分)'
    },
    hour: {
        name: '时',
        every: '每一小时',
        circle: ['从第', '小时开始，每隔', '小时执行一次'],
        cycle: ['从第', '小时，到第', '小时，每小时执行一次'],
        specific: '具体时间(小时)'
    },
    day: {
        name: '天&周',
        oneDay: ['每一天', '这个月最后一天', '这个月最后一个工作日'],
        lastDay: ['当前月倒数第', '天'],
        workDay: ['当前月最近的工作日到本月的第', '天'],
        circle: ['从第', '天开始，每隔', '天执行一次'],
        cycle: ['从第', '天，到第', '天，每天执行一次'],
        startWeek: ['从', '开始，每隔', '天执行一次'],
        specific: '具体时间(天)',
        specificWeek: '具体时间(星期)',
        lastWeek: ['这个月最后一个'],
        conWeek: ['当前月第', '个']
    },
    Week: [
        { label: '星期天', value: 1, name: 'SUN' },
        { label: '星期一', value: 2, name: 'MON' },
        { label: '星期二', value: 3, name: 'TUE' },
        { label: '星期三', value: 4, name: 'WED' },
        { label: '星期四', value: 5, name: 'THU' },
        { label: '星期五', value: 6, name: 'FRI' },
        { label: '星期六', value: 7, name: 'SAT' }
    ],
    month: {
        name: '月',
        every: '每一月',
        circle: ['从第', '月开始，每隔', '月执行一次'],
        cycle: ['从第', '月，到第', '月，每月执行一次'],
        specific: '具体时间(月)'
    },
    year: {
        name: '年',
        every: '每一年',
        circle: ['从第', '年开始，每隔', '年执行一次'],
        cycle: ['从第', '年，到第', '年，每年执行一次'],
        specific: '具体时间(年)'
    },
    save: '确认',
    close: '取消',
    placeholder: '请选择',
    language: [
        { label: '中文', value: 'cn' },
        { label: '英文', value: 'en' }
    ]
};
exports.default = cn;
