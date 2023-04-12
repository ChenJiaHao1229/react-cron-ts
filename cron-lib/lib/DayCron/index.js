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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var Language_1 = __importDefault(require("../Language"));
var DayCron = function (_a) {
    var day = _a.day, week = _a.week, setDay = _a.setDay, setWeek = _a.setWeek, language = _a.language;
    var Language = (0, Language_1.default)(language);
    var _b = (0, react_1.useState)(0), selectRadio = _b[0], setSelectRadio = _b[1];
    var _c = (0, react_1.useState)(1), lastDay = _c[0], setLastDay = _c[1];
    var _d = (0, react_1.useState)(1), workDay = _d[0], setWorkDay = _d[1];
    var _e = (0, react_1.useState)(1), circleStart = _e[0], setCircleStart = _e[1];
    var _f = (0, react_1.useState)(1), circleTime = _f[0], setCircleTime = _f[1];
    var _g = (0, react_1.useState)(1), cycleStart = _g[0], setCycleStart = _g[1];
    var _h = (0, react_1.useState)(1), cycleEnd = _h[0], setCycleEnd = _h[1];
    var _j = (0, react_1.useState)(Language.Week[0].value), startWeek = _j[0], setStartWeek = _j[1];
    var _k = (0, react_1.useState)(1), spaceDay = _k[0], setSpaceDay = _k[1];
    var _l = (0, react_1.useState)([1]), selectDayList = _l[0], setSelectDayList = _l[1];
    var _m = (0, react_1.useState)([Language.Week[0].name]), selectWeekList = _m[0], setSelectWeekList = _m[1];
    var _o = (0, react_1.useState)(Language.Week[0].value), lastWeek = _o[0], setLastWeek = _o[1];
    var _p = (0, react_1.useState)(1), conunt = _p[0], setConunt = _p[1];
    var _q = (0, react_1.useState)(Language.Week[0].value), conWeek = _q[0], setConWeek = _q[1];
    (0, react_1.useEffect)(function () {
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
                    setSelectRadio(3);
                    setLastDay(parseInt(day.slice(2)));
                }
            }
            else if (day.indexOf('W') !== -1) {
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
    return ((0, jsx_runtime_1.jsxs)(antd_1.Radio.Group, __assign({ onChange: handleRadio, value: selectRadio, className: "react-cron-bh-radio-group" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 0 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: Language.day.oneDay[0] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 1 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: Language.day.oneDay[1] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 2 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: Language.day.oneDay[2] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 3 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.lastDay[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: lastDay, onChange: function (value) {
                                    if (selectRadio === 3)
                                        handlerCron("L-".concat(value), 'day');
                                    else
                                        setLastDay(value || 1);
                                } }), "\u00A0 ", Language.day.lastDay[1]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 4 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.workDay[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: workDay, onChange: function (value) {
                                    if (selectRadio === 4)
                                        handlerCron("".concat(value, "W"), 'day');
                                    else
                                        setWorkDay(value || 1);
                                } }), "\u00A0 ", Language.day.workDay[1]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 5 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.circle[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: circleStart, onChange: function (value) {
                                    if (selectRadio === 5)
                                        handlerCron("".concat(value, "/").concat(circleTime), 'day');
                                    else
                                        setCircleStart(value || 0);
                                } }), "\u00A0", Language.day.circle[1], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 31, value: circleTime, onChange: function (value) {
                                    if (selectRadio === 5)
                                        handlerCron("".concat(circleStart, "/").concat(value), 'day');
                                    else
                                        setCircleTime(value || 1);
                                } }), "\u00A0 ", Language.day.circle[2]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 6 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.cycle[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: cycleEnd, value: cycleStart, onChange: function (value) {
                                    if (selectRadio === 6)
                                        handlerCron("".concat(value, "-").concat(cycleEnd), 'day');
                                    else
                                        setCycleStart(value || 0);
                                } }), "\u00A0 ", Language.day.cycle[1], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: cycleStart, max: 31, value: cycleEnd, onChange: function (value) {
                                    if (selectRadio === 6)
                                        handlerCron("".concat(cycleStart, "-").concat(value), 'day');
                                    else
                                        setCycleEnd(value || circleStart);
                                } }), "\u00A0 ", Language.day.cycle[2]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 7 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.startWeek[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: Language.placeholder, className: "react-cron-bh-radio-content-select", value: startWeek, options: Language.Week, onChange: function (value) {
                                    if (selectRadio === 7)
                                        handlerCron("".concat(value, "/").concat(spaceDay), 'week');
                                    else
                                        setStartWeek(value);
                                } }), "\u00A0", Language.day.startWeek[1], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 7, value: spaceDay, onChange: function (value) {
                                    if (selectRadio === 7)
                                        handlerCron("".concat(startWeek, "/").concat(value), 'week');
                                    else
                                        setSpaceDay(value || 1);
                                } }), "\u00A0 ", Language.day.startWeek[2]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 8 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: Language.day.specific }), "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: Language.placeholder, mode: "multiple", className: "react-cron-bh-radio-content-select", value: selectDayList, options: Array(31)
                                    .fill(0)
                                    .map(function (item, index) { return ({ label: index + 1, value: index + 1 }); }), onChange: function (values) {
                                    if (selectRadio === 8)
                                        handlerCron(values.length > 0 ? values.sort().join(',') : '1', 'day');
                                    else
                                        setSelectDayList(values);
                                } })] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 9 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: Language.day.specificWeek }), "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: Language.placeholder, mode: "multiple", className: "react-cron-bh-radio-content-select", value: selectWeekList, options: Language.Week, fieldNames: { value: 'name' }, onChange: function (values) {
                                    if (selectRadio === 9)
                                        handlerCron(values.length > 0 ? values.sort().join(',') : 'SUN', 'week');
                                    else
                                        setSelectWeekList(values);
                                } })] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 10 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.lastWeek[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: Language.placeholder, className: "react-cron-bh-radio-content-select", value: lastWeek, options: Language.Week, onChange: function (value) {
                                    if (selectRadio === 10)
                                        handlerCron("".concat(value, "L"), 'week');
                                    else
                                        setLastWeek(value);
                                } }), Language.day.lastWeek[1] && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u00A0", Language.day.lastWeek[1]] })] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 11 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language.day.conWeek[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: 5, value: conunt, onChange: function (value) {
                                    if (selectRadio === 11)
                                        handlerCron("".concat(conWeek, "#").concat(value), 'week');
                                    else
                                        setConunt(value || 1);
                                } }), "\u00A0", Language.day.conWeek[1], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: Language.placeholder, className: "react-cron-bh-radio-content-select", value: conWeek, options: Language.Week, onChange: function (value) {
                                    if (selectRadio === 11)
                                        handlerCron("".concat(value, "#").concat(conunt), 'week');
                                    else
                                        setConWeek(value);
                                } }), Language.day.conWeek[2] && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u00A0", Language.day.conWeek[2]] })] }))] })] })));
};
exports.default = DayCron;
