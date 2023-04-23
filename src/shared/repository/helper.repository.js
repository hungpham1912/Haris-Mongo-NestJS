"use strict";
exports.__esModule = true;
exports.Equal = exports.MoreThan = void 0;
var MoreThan = function (value) {
    return {
        $gt: value
    };
};
exports.MoreThan = MoreThan;
var Equal = function (value) {
    return {
        $eq: value
    };
};
exports.Equal = Equal;
