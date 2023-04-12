"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var cn_1 = __importDefault(require("./cn"));
var en_1 = __importDefault(require("./en"));
function useLanguage(lang) {
    var _a = (0, react_1.useState)(cn_1.default), language = _a[0], setLanguage = _a[1];
    (0, react_1.useEffect)(function () { return setLanguage({ cn: cn_1.default, en: en_1.default }[lang]); }, [lang]);
    return language;
}
exports.default = useLanguage;
