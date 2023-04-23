"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransformInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ip = require("ip");
var TransformInterceptor = /** @class */ (function () {
    function TransformInterceptor() {
    }
    TransformInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        return next.handle().pipe((0, operators_1.map)(function (data) {
            return _this.matching(data, context);
        }), (0, operators_1.timeout)(30000), (0, operators_1.catchError)(function (err) {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(function () { return new common_1.RequestTimeoutException(); });
            }
            return (0, rxjs_1.throwError)(function () { return err; });
        }));
    };
    TransformInterceptor.prototype.matching = function (data, context) {
        var status = 200;
        var request = context.switchToHttp().getRequest();
        var url = request.url, method = request.method;
        switch (true) {
            case !data:
                break;
            case typeof data.statusCode != 'number' && method == HttpMethod.GET:
                status = common_1.HttpStatus.OK;
                break;
            case typeof data.statusCode != 'number' && method == HttpMethod.POST:
                status = common_1.HttpStatus.CREATED;
                break;
            case typeof data.statusCode == 'number':
                status = data.statusCode;
                break;
        }
        var now = new Date().toISOString();
        context.switchToHttp().getResponse().status(status);
        console.log("\uD83D\uDCA5\uD83D\uDCA5 ".concat(method, " ~ ").concat(status, " ~ ").concat(url, " ~ ").concat(ip.address(), " ... ").concat(now));
        return data;
    };
    TransformInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], TransformInterceptor);
    return TransformInterceptor;
}());
exports.TransformInterceptor = TransformInterceptor;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
})(HttpMethod || (HttpMethod = {}));
