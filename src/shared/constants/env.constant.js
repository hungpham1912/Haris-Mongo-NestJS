"use strict";
exports.__esModule = true;
exports.ENV_CONFIG = void 0;
var config_lib_1 = require("../lib/config/config.lib");
exports.ENV_CONFIG = {
    database: {
        url: (0, config_lib_1.getConfig)('database.url')
    },
    system: {
        port: (0, config_lib_1.getConfig)('system.port') || 3000,
        apiVersion: (0, config_lib_1.getConfig)('system.api_version')
    }
};
