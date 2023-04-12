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
var options = Array(60)
    .fill(0)
    .map(function (item, index) { return ({ label: index, value: index }); });
var thisYear = new Date().getFullYear();
var typeInfo = {
    second: {
        max: 59,
        min: 0,
        options: options
    },
    minute: {
        max: 59,
        min: 0,
        options: options
    },
    hour: {
        max: 23,
        min: 0,
        options: Array(24)
            .fill(0)
            .map(function (item, index) { return ({ label: index, value: index }); })
    },
    month: {
        max: 12,
        min: 1,
        options: Array(12)
            .fill(0)
            .map(function (item, index) { return ({ label: index + 1, value: index + 1 }); })
    },
    year: {
        max: thisYear + 100,
        min: thisYear,
        options: Array(100)
            .fill(0)
            .map(function (item, index) { return ({ label: index + thisYear, value: index + thisYear }); })
    }
};
var TimeSelect = function (_a) {
    var value = _a.value, onChange = _a.onChange, type = _a.type, language = _a.language;
    var _b = (0, react_1.useState)(0), selectRadio = _b[0], setSelectRadio = _b[1];
    var _c = (0, react_1.useState)(typeInfo[type].min), circleStart = _c[0], setCircleStart = _c[1];
    var _d = (0, react_1.useState)(1), circleTime = _d[0], setCircleTime = _d[1];
    var _e = (0, react_1.useState)(typeInfo[type].min), cycleStart = _e[0], setCycleStart = _e[1];
    var _f = (0, react_1.useState)(typeInfo[type].min), cycleEnd = _f[0], setCycleEnd = _f[1];
    var _g = (0, react_1.useState)([typeInfo[type].options[0].value]), selectTime = _g[0], setSelectTime = _g[1];
    var Language = (0, Language_1.default)(language);
    (0, react_1.useEffect)(function () {
        if (value === '*') {
            setSelectRadio(0);
        }
        else if (value.indexOf('/') > -1) {
            setSelectRadio(1);
            var _a = value.split('/'), start = _a[0], end = _a[1];
            setCircleStart(parseInt(start));
            setCircleTime(parseInt(end));
        }
        else if (value.indexOf('-') > -1) {
            setSelectRadio(2);
            var _b = value.split('-'), start = _b[0], end = _b[1];
            setCycleStart(parseInt(start));
            setCycleEnd(parseInt(end));
        }
        else {
            setSelectRadio(3);
            setSelectTime(value.split(',').map(function (item) { return parseInt(item); }));
        }
    }, [value]);
    var handleRadio = function (e) {
        setSelectRadio(e.target.value);
        switch (e.target.value) {
            case 0:
                onChange('*');
                break;
            case 1:
                onChange("".concat(circleStart, "/").concat(circleTime));
                break;
            case 2:
                onChange("".concat(cycleStart, "-").concat(cycleEnd));
                break;
            default:
                onChange(selectTime.length > 0 ? selectTime.sort().join(',') : "".concat(typeInfo[type].min));
                break;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Radio.Group, __assign({ onChange: handleRadio, value: selectRadio, className: "react-cron-bh-radio-group" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 0 }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: Language[type].every }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 1 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language[type].circle[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: typeInfo[type].min, max: typeInfo[type].max, value: circleStart, onChange: function (value) {
                                    if (selectRadio === 1)
                                        onChange("".concat(value, "/").concat(circleTime));
                                    else
                                        setCircleStart(value || typeInfo[type].min);
                                } }), "\u00A0 ", Language[type].circle[1], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: 1, max: typeInfo[type].max, value: circleTime, onChange: function (value) {
                                    if (selectRadio === 1)
                                        onChange("".concat(circleStart, "/").concat(value));
                                    else
                                        setCircleTime(value || 1);
                                } }), "\u00A0 ", Language[type].circle[2]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 2 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [Language[type].cycle[0], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: typeInfo[type].min, max: cycleEnd, value: cycleStart, onChange: function (value) {
                                    if (selectRadio === 2)
                                        onChange("".concat(value, "-").concat(cycleEnd));
                                    else
                                        setCycleStart(value || typeInfo[type].min);
                                } }), "\u00A0 ", Language[type].cycle[1], "\u00A0", (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { className: "react-cron-bh-radio-number", min: cycleStart, max: typeInfo[type].max, value: cycleEnd, onChange: function (value) {
                                    if (selectRadio === 2)
                                        onChange("".concat(cycleStart, "-").concat(value));
                                    else
                                        setCycleEnd(value || circleStart);
                                } }), "\u00A0 ", Language[type].cycle[2]] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 3 }), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "react-cron-bh-radio-content" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: Language[type].specific }), (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: Language.placeholder, mode: "multiple", className: "react-cron-bh-radio-content-select", value: selectTime, options: typeInfo[type].options, onChange: function (values) {
                                    if (selectRadio === 3)
                                        onChange(values.length > 0 ? values.sort().join(',') : "".concat(typeInfo[type].min));
                                    else
                                        setSelectTime(values);
                                } })] }))] })] })));
};
exports.default = TimeSelect;
