"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var weekList = [
    { label: '星期天', value: 1, name: 'SUN' },
    { label: '星期一', value: 2, name: 'MON' },
    { label: '星期二', value: 3, name: 'TUE' },
    { label: '星期三', value: 4, name: 'WED' },
    { label: '星期四', value: 5, name: 'THU' },
    { label: '星期五', value: 6, name: 'FRI' },
    { label: '星期六', value: 7, name: 'SAT' }
];
var DayCron = function (_a) {
    var day = _a.day, week = _a.week, setDay = _a.setDay, setWeek = _a.setWeek;
    var _b = (0, react_1.useState)(0), selectRadio = _b[0], setSelectRadio = _b[1]; // 单选值
    var _c = (0, react_1.useState)(1), lastDay = _c[0], setLastDay = _c[1]; // 当前月倒数第   3
    var _d = (0, react_1.useState)(1), workDay = _d[0], setWorkDay = _d[1]; // 当前月工作日   4
    var _e = (0, react_1.useState)(1), circleStart = _e[0], setCircleStart = _e[1]; // 循环开始时间   5
    var _f = (0, react_1.useState)(1), circleTime = _f[0], setCircleTime = _f[1]; // 循环时间大小     5
    var _g = (0, react_1.useState)(1), cycleStart = _g[0], setCycleStart = _g[1]; // 周期开始时间   6
    var _h = (0, react_1.useState)(1), cycleEnd = _h[0], setCycleEnd = _h[1]; // 周期结束时间       6
    var _j = (0, react_1.useState)(weekList[0].value), startWeek = _j[0], setStartWeek = _j[1]; // 开始的星期   7
    var _k = (0, react_1.useState)(1), spaceDay = _k[0], setSpaceDay = _k[1]; // 开始的星期相隔天数              7
    var _l = (0, react_1.useState)([1]), selectDayList = _l[0], setSelectDayList = _l[1]; // 具体的哪天    8
    var _m = (0, react_1.useState)([weekList[0].name]), selectWeekList = _m[0], setSelectWeekList = _m[1]; // 具体的哪星期    9
    var _o = (0, react_1.useState)(weekList[0].value), lastWeek = _o[0], setLastWeek = _o[1]; // 最后一个星期几   10
    var _p = (0, react_1.useState)(1), conunt = _p[0], setConunt = _p[1]; // 这个月第几周         11
    var _q = (0, react_1.useState)(weekList[0].value), conWeek = _q[0], setConWeek = _q[1]; // 这个月第几周星期几   11
    (0, react_1.useEffect)(function () {
        // 回显数据
        if (week === '?') {
            if (day === '*') {
                setSelectRadio(0);
            }
            else if (day.indexOf('L') !== -1) {
                if (day === 'L') {
                    setSelectRadio(1);
                }
                else if (day === 'LW') {
                    setSelectRadio(2);
                }
                else {
                    // 均不是 则只会是L-?了 直接取后一节
                    setSelectRadio(3);
                    setLastDay(parseInt(day.slice(2)));
                }
            }
            else if (day.indexOf('W') !== -1) {
                // 只会是 ?W的情况了 所有可以直接截取
                setSelectRadio(4);
                setWorkDay(parseInt(day.slice(0, -1)));
            }
            else if (day.indexOf('/') !== -1) {
                setSelectRadio(5);
                var _a = day.split('/'), start = _a[0], end = _a[1];
                setCircleStart(parseInt(start));
                setCircleTime(parseInt(end));
            }
            else if (day.indexOf('-') !== -1) {
                setSelectRadio(6);
                var _b = day.split('-'), start = _b[0], end = _b[1];
                setCycleStart(parseInt(start));
                setCycleEnd(parseInt(end));
            }
            else {
                setSelectRadio(8);
                setSelectDayList(day.split(',').map(function (item) { return parseInt(item); }));
            }
        }
        else {
            if (week.indexOf('/') !== -1) {
                setSelectRadio(7);
                var _c = week.split('/'), start = _c[0], end = _c[1];
                setStartWeek(parseInt(start));
                setSpaceDay(parseInt(end));
            }
            else if (week.indexOf('L') !== -1) {
                // 只会是 ?L的情况了 所有可以直接截取
                setSelectRadio(10);
                setLastWeek(parseInt(week.slice(0, -1)));
            }
            else if (week.indexOf('#') !== -1) {
                setSelectRadio(11);
                var _d = week.split('#'), start = _d[0], end = _d[1];
                setConWeek(parseInt(start));
                setConunt(parseInt(end));
            }
            else {
                setSelectRadio(9);
                setSelectWeekList(week.split(',').map(function (item) { return item; }));
            }
        }
    }, [day, week]);
    // 单选修改
    var handleRadio = function (e) {
        setSelectRadio(e.target.value);
        switch (e.target.value) {
            case 0:
                handlerCron('*', 'day');
                break;
            case 1:
                handlerCron('L', 'day');
                break;
            case 2:
                handlerCron('LW', 'day');
                break;
            case 3:
                handlerCron("L-".concat(lastDay), 'day');
                break;
            case 4:
                handlerCron("".concat(workDay, "W"), 'day');
                break;
            case 5:
                handlerCron("".concat(circleStart, "/").concat(circleTime), 'day');
                break;
            case 6:
                handlerCron("".concat(cycleStart, "-").concat(cycleEnd), 'day');
                break;
            case 7:
                handlerCron("".concat(startWeek, "/").concat(spaceDay), 'week');
                break;
            case 8:
                handlerCron(selectDayList.length > 0 ? selectDayList.sort().join(',') : '1', 'day');
                break;
            case 9:
                handlerCron(selectWeekList.length > 0 ? selectWeekList.sort().join(',') : 'SUN', 'week');
                break;
            case 10:
                handlerCron("".concat(lastWeek, "L"), 'week');
                break;
            default:
                handlerCron("".concat(conWeek, "#").concat(conunt), 'week');
                break;
        }
    };
    // 修改Cron
    var handlerCron = function (value, type) {
        if (type === void 0) { type = 'day'; }
        if (type === 'day') {
            setDay(value);
            setWeek('?');
        }
        else {
            setWeek(value);
            setDay('?');
        }
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Radio.Group, __assign({ onChange: handleRadio, value: selectRadio, className: "react-cron-bh-radio-group" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 0 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: "\u6BCF\u4E00\u5929" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 1 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: "\u8FD9\u4E2A\u6708\u6700\u540E\u4E00\u5929" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 2 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: "\u8FD9\u4E2A\u6708\u6700\u540E\u4E00\u4E2A\u5DE5\u4F5C\u65E5" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 3 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: ["\u5F53\u524D\u6708\u5012\u6570\u7B2C\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: lastDay, onChange: function (value) {
                                    if (selectRadio === 3)
                                        handlerCron("L-".concat(value), 'day');
                                    else
                                        setLastDay(value || 1);
                                } }), "\u00A0 \u5929"] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 4 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: ["\u5F53\u524D\u6708\u6700\u8FD1\u7684\u5DE5\u4F5C\u65E5\u5230\u672C\u6708\u7684\u7B2C\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: workDay, onChange: function (value) {
                                    if (selectRadio === 4)
                                        handlerCron("".concat(value, "W"), 'day');
                                    else
                                        setWorkDay(value || 1);
                                } }), "\u00A0 \u5929"] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 5 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: ["\u4ECE\u7B2C\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: circleStart, onChange: function (value) {
                                    if (selectRadio === 5)
                                        handlerCron("".concat(value, "/").concat(circleTime), 'day');
                                    else
                                        setCircleStart(value || 0);
                                } }), "\u00A0\u5929\u5F00\u59CB\uFF0C\u6BCF\u9694\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: circleTime, onChange: function (value) {
                                    if (selectRadio === 5)
                                        handlerCron("".concat(circleStart, "/").concat(value), 'day');
                                    else
                                        setCircleTime(value || 1);
                                } }), "\u00A0 \u5929\u6267\u884C\u4E00\u6B21"] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 6 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: ["\u4ECE\u7B2C\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: cycleEnd, value: cycleStart, onChange: function (value) {
                                    if (selectRadio === 6)
                                        handlerCron("".concat(value, "-").concat(cycleEnd), 'day');
                                    else
                                        setCycleStart(value || 0);
                                } }), "\u00A0 \u5929\uFF0C\u5230\u7B2C\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: cycleStart, max: 31, value: cycleEnd, onChange: function (value) {
                                    if (selectRadio === 6)
                                        handlerCron("".concat(cycleStart, "-").concat(value), 'day');
                                    else
                                        setCycleEnd(value || circleStart);
                                } }), "\u00A0 \u5929\uFF0C\u6BCF\u5929\u6267\u884C\u4E00\u6B21"] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 7 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: ["\u4ECE\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9", className: "react-cron-bh-radio-content-select", value: startWeek, options: weekList, onChange: function (value) {
                                    if (selectRadio === 7)
                                        handlerCron("".concat(value, "/").concat(spaceDay), 'week');
                                    else
                                        setStartWeek(value);
                                } }), "\u00A0\u5F00\u59CB\uFF0C\u6BCF\u9694\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 7, value: spaceDay, onChange: function (value) {
                                    if (selectRadio === 7)
                                        handlerCron("".concat(startWeek, "/").concat(value), 'week');
                                    else
                                        setSpaceDay(value || 1);
                                } }), "\u00A0 \u5929\u6267\u884C\u4E00\u6B21"] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 8 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u5177\u4F53\u54EA\u5929" }), "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9", mode: "multiple", className: "react-cron-bh-radio-content-select", value: selectDayList, options: Array(31)
                                    .fill(0)
                                    .map(function (item, index) { return ({ label: index + 1, value: index + 1 }); }), onChange: function (values) {
                                    if (selectRadio === 8)
                                        handlerCron(values.length > 0 ? values.sort().join(',') : '1', 'day');
                                    else
                                        setSelectDayList(values);
                                } })] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 9 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u5177\u4F53\u661F\u671F" }), "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9", mode: "multiple", className: "react-cron-bh-radio-content-select", value: selectWeekList, options: weekList, fieldNames: { value: 'name' }, onChange: function (values) {
                                    if (selectRadio === 9)
                                        handlerCron(values.length > 0 ? values.sort().join(',') : 'SUN', 'week');
                                    else
                                        setSelectWeekList(values);
                                } })] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 10 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8FD9\u4E2A\u6708\u6700\u540E\u4E00\u4E2A" }), "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9", className: "react-cron-bh-radio-content-select", value: lastWeek, options: weekList, onChange: function (value) {
                                    if (selectRadio === 10)
                                        handlerCron("".concat(value, "L"), 'week');
                                    else
                                        setLastWeek(value);
                                } })] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 11 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: ["\u5F53\u524D\u6708\u7B2C\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 5, value: conunt, onChange: function (value) {
                                    if (selectRadio === 11)
                                        handlerCron("".concat(conWeek, "#").concat(value), 'week');
                                    else
                                        setConunt(value || 1);
                                } }), "\u00A0\u4E2A\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9", className: "react-cron-bh-radio-content-select", value: conWeek, options: weekList, onChange: function (value) {
                                    if (selectRadio === 11)
                                        handlerCron("".concat(value, "#").concat(conunt), 'week');
                                    else
                                        setConWeek(value);
                                } })] }))] })] })));
};
exports.default = DayCron;
