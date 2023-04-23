"use strict";
exports.__esModule = true;
exports.getConfig = void 0;
var config = require("config");
function getConfig(key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    try {
        var value = config.get(key);
        if (typeof value === 'undefined') {
            return defaultValue;
        }
        return value;
    }
    catch (error) {
        console.log('🚀 ~ file: getConfig.ts ~ line 12 ~ getConfig ~ error', error);
    }
}
exports.getConfig = getConfig;
