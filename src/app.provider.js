"use strict";
exports.__esModule = true;
exports.customProvider = void 0;
var core_1 = require("@nestjs/core");
var transform_interceptor_1 = require("./middlewares/interceptors/transform.interceptor");
var filter_1 = require("./middlewares/filters/filter");
exports.customProvider = [
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: transform_interceptor_1.TransformInterceptor
    },
    {
        provide: core_1.APP_FILTER,
        useClass: filter_1.BadRequestExceptionFilter
    },
    {
        provide: core_1.APP_FILTER,
        useClass: filter_1.ForbiddenExceptionFilter
    },
    {
        provide: core_1.APP_FILTER,
        useClass: filter_1.UnauthorizedExceptionFilter
    },
];
