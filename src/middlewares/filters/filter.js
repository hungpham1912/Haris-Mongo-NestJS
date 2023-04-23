"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UnauthorizedExceptionFilter = exports.ForbiddenExceptionFilter = exports.BadRequestExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var BadRequestExceptionFilter = /** @class */ (function () {
    function BadRequestExceptionFilter() {
    }
    BadRequestExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var status = exception.getStatus();
        var getRes = exception.getResponse();
        response.status(status).json({
            statusCode: status,
            message: getRes.message,
            error: 'BAD_REQUEST'
        });
    };
    BadRequestExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.BadRequestException)
    ], BadRequestExceptionFilter);
    return BadRequestExceptionFilter;
}());
exports.BadRequestExceptionFilter = BadRequestExceptionFilter;
var ForbiddenExceptionFilter = /** @class */ (function () {
    function ForbiddenExceptionFilter() {
    }
    ForbiddenExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var status = exception.getStatus();
        response
            .status(status)
            .json({
            statusCode: status,
            message: 'Account insufficient permissions to take action',
            error: 'FORBIDDEN'
        });
    };
    ForbiddenExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.ForbiddenException)
    ], ForbiddenExceptionFilter);
    return ForbiddenExceptionFilter;
}());
exports.ForbiddenExceptionFilter = ForbiddenExceptionFilter;
var UnauthorizedExceptionFilter = /** @class */ (function () {
    function UnauthorizedExceptionFilter() {
    }
    UnauthorizedExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var status = exception.getStatus();
        response
            .status(status)
            .json({
            statusCode: status,
            message: 'An error occurred while processing the access token',
            error: 'UNAUTHORIZED'
        });
    };
    UnauthorizedExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.UnauthorizedException)
    ], UnauthorizedExceptionFilter);
    return UnauthorizedExceptionFilter;
}());
exports.UnauthorizedExceptionFilter = UnauthorizedExceptionFilter;
