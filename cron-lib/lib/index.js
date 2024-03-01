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
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = require("react");
var TimeSelect_1 = __importDefault(require("./TimeSelect"));
var DayCron_1 = __importDefault(require("./DayCron"));
var Language_1 = __importDefault(require("./Language"));
require("./index.css");
var Cron = function (_a) {
    var value = _a.value, children = _a.children, inputProps = _a.inputProps, height = _a.height, closeClearEditData = _a.closeClearEditData, style = _a.style, className = _a.className, _b = _a.language, language = _b === void 0 ? 'cn' : _b, _c = _a.noYear, noYear = _c === void 0 ? false : _c, handleLanguage = _a.handleLanguage, onChange = _a.onChange;
    var _d = (0, react_1.useState)(false), open = _d[0], setOpen = _d[1];
    return ((0, jsx_runtime_1.jsx)(antd_1.Popover, __assign({ content: (0, jsx_runtime_1.jsx)(CronContent, { value: value || '* * * * * ? *', height: height, onChange: function (value) { return onChange && onChange(value); }, open: open, language: language, handleLanguage: handleLanguage, setOpen: setOpen, closeClearEditData: closeClearEditData, noYear: noYear }), overlayInnerStyle: { padding: 0 }, trigger: "click", open: open, onOpenChange: setOpen }, { children: children || ((0, jsx_runtime_1.jsx)(antd_1.Input, __assign({ value: value, suffix: (0, jsx_runtime_1.jsx)(icons_1.FieldTimeOutlined, {}), readOnly: true, className: className, style: style }, inputProps))) })));
};
var getTab = function (title) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icons_1.InsertRowAboveOutlined, {}), title] }));
};
var secondReg = /^\*$|(^([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])$)|(^([0-9]|[1-5][0-9])\/\d+$)|(^(([0-9]|[1-5][0-9]),)*([0-9]|[1-5][0-9])$)/;
var minuteReg = /^\*$|(^([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])$)|(^([0-9]|[1-5][0-9])\/\d+$)|(^(([0-9]|[1-5][0-9]),)*([0-9]|[1-5][0-9])$)/;
var hourReg = /(^\*$)|(^([0-9]|(1[0-9])|(2[0-3]))-([0-9]|(1[0-9])|(2[0-3]))$)|(^([0-9]|(1[0-9])|(2[0-3]))\/\d+$)|(^(([0-9]|(1[0-9])|(2[0-3])),)*([0-9]|(1[0-9])|(2[0-3]))$)/;
var dayReg = /^\*$|^\?$|(^([1-9]|[1-2][0-9]|3[0-1])-([1-9]|[1-2][0-9]|3[0-1])$)|(^([1-9]|[1-2][0-9]|3[0-1])\/\d+$)|(^(([1-9]|[1-2][0-9]|3[0-1]),)*([1-9]|[1-2][0-9]|3[0-1])$)/;
var monthReg = /^\*$|(^([1-9]|1[0-2])-([1-9]|1[0-2])$)|(^([1-9]|1[0-2])\/\d+$)|(^(([1-9]|1[0-2]),)*([1-9]|1[0-2])$)/;
var weekReg = /^\*$|^\?$|(^(SUN|MON|TUE|WED|THU|FRI|SAT)-(SUN|MON|TUE|WED|THU|FRI|SAT)$)|(^(SUN|MON|TUE|WED|THU|FRI|SAT)#\d+$)|(^(SUN|MON|TUE|WED|THU|FRI|SAT)L$)|(^((SUN|MON|TUE|WED|THU|FRI|SAT),)*(SUN|MON|TUE|WED|THU|FRI|SAT)$)/;
var yearReg = /^\*$|^\?$|(^(2019|20[2-5][0-9]|206[0-6])-(2019|20[2-5][0-9]|206[0-6])$)|(^(2019|20[2-5][0-9]|206[0-6])\/\d+$)|(^((2019|20[2-5][0-9]|206[0-6]),)*(2019|20[2-5][0-9]|206[0-6])$)/;
var CronContent = function (_a) {
    var value = _a.value, height = _a.height, setOpen = _a.setOpen, onChange = _a.onChange, closeClearEditData = _a.closeClearEditData, open = _a.open, language = _a.language, handleLanguage = _a.handleLanguage, noYear = _a.noYear;
    var _b = (0, react_1.useState)('second'), active = _b[0], setActive = _b[1];
    var _c = (0, react_1.useState)(''), cronText = _c[0], setCronText = _c[1];
    var _d = (0, react_1.useState)('*'), second = _d[0], setSecond = _d[1];
    var _e = (0, react_1.useState)('*'), minute = _e[0], setMinute = _e[1];
    var _f = (0, react_1.useState)('*'), hour = _f[0], setHour = _f[1];
    var _g = (0, react_1.useState)('*'), day = _g[0], setDay = _g[1];
    var _h = (0, react_1.useState)('*'), month = _h[0], setMonth = _h[1];
    var _j = (0, react_1.useState)('*'), week = _j[0], setWeek = _j[1];
    var _k = (0, react_1.useState)('*'), year = _k[0], setYear = _k[1];
    var Language = (0, Language_1.default)(language);
    (0, react_1.useEffect)(function () {
        if (open && closeClearEditData)
            initData();
    }, [open]);
    (0, react_1.useEffect)(function () {
        initData();
    }, [value]);
    var initData = function () {
        var _a = value.split(' '), second = _a[0], minute = _a[1], hour = _a[2], day = _a[3], month = _a[4], week = _a[5], year = _a[6];
        setSecond(secondReg.test(second) ? second : '*');
        setMinute(minuteReg.test(minute) ? minute : '*');
        setHour(hourReg.test(hour) ? hour : '*');
        setDay(dayReg.test(day) ? day : '*');
        setMonth(monthReg.test(month) ? month : '*');
        setWeek(weekReg.test(week) ? week : '?');
        setYear(yearReg.test(year) ? year : '*');
        setCronText("".concat(second, " ").concat(minute, " ").concat(hour, " ").concat(day, " ").concat(month, " ").concat(week).concat(noYear ? '' : " ".concat(year)));
    };
    (0, react_1.useEffect)(function () {
        setCronText("".concat(second, " ").concat(minute, " ").concat(hour, " ").concat(day, " ").concat(month, " ").concat(week).concat(noYear ? '' : " ".concat(year)));
    }, [second, minute, hour, day, month, week, year, noYear]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ onClick: function (e) { return e.stopPropagation(); }, style: { padding: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Card, __assign({ bodyStyle: {
                    padding: 0,
                    width: language === 'cn' ? 480 : 645,
                    maxHeight: height
                }, rootClassName: "react-cron-bh-card", bordered: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { className: "react-cron-bh-tabs", activeKey: active, type: "card", onChange: setActive, items: [
                        {
                            key: 'second',
                            label: getTab(Language.second.name),
                            children: ((0, jsx_runtime_1.jsx)(TimeSelect_1.default, { value: second, onChange: setSecond, type: "second", language: language })),
                            className: 'react-cron-bh-tab'
                        },
                        {
                            key: 'minute',
                            label: getTab(Language.minute.name),
                            children: ((0, jsx_runtime_1.jsx)(TimeSelect_1.default, { value: minute, onChange: setMinute, type: "minute", language: language })),
                            className: 'react-cron-bh-tab'
                        },
                        {
                            key: 'hour',
                            label: getTab(Language.hour.name),
                            children: ((0, jsx_runtime_1.jsx)(TimeSelect_1.default, { value: hour, onChange: setHour, type: "hour", language: language })),
                            className: 'react-cron-bh-tab'
                        },
                        {
                            key: 'day',
                            label: getTab(Language.day.name),
                            children: ((0, jsx_runtime_1.jsx)(DayCron_1.default, { day: day, week: week, setDay: setDay, setWeek: setWeek, language: language })),
                            className: 'react-cron-bh-tab'
                        },
                        {
                            key: 'month',
                            label: getTab(Language.month.name),
                            children: ((0, jsx_runtime_1.jsx)(TimeSelect_1.default, { value: month, onChange: setMonth, type: "month", language: language })),
                            className: 'react-cron-bh-tab'
                        },
                        !noYear && {
                            key: 'year',
                            label: getTab(Language.year.name),
                            children: ((0, jsx_runtime_1.jsx)(TimeSelect_1.default, { value: year, onChange: setYear, type: "year", language: language })),
                            className: 'react-cron-bh-tab'
                        }
                    ].filter(Boolean) }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "react-cron-bh-bottom" }, { children: [handleLanguage ? ((0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { options: Language.language, onChange: function (_a) {
                            var value = _a.target.value;
                            return handleLanguage === null || handleLanguage === void 0 ? void 0 : handleLanguage(value);
                        }, value: language, optionType: "button", buttonStyle: "solid" })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ title: cronText }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-bottom-cron" }, { children: cronText })) })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ style: { marginRight: 8 }, onClick: function () { return setOpen(false); } }, { children: Language.close })), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ type: "primary", onClick: function () {
                                    onChange(cronText);
                                    setOpen(false);
                                } }, { children: Language.save }))] })] }))] })));
};
exports.default = Cron;
