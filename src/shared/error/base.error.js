"use strict";
exports.__esModule = true;
exports.BASE_ERROR = exports.MESSAGES_BASE_ERROR = void 0;
var common_1 = require("@nestjs/common");
exports.MESSAGES_BASE_ERROR = {
    1: 'INTERNAL_SERVER_ERROR(*)'
};
exports.BASE_ERROR = [
    {
        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        error: exports.MESSAGES_BASE_ERROR[1]
    },
];
