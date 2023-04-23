"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var users_module_1 = require("./modules/users/users.module");
var users_controller_1 = require("./modules/users/users.controller");
var core_1 = require("@nestjs/core");
var mongoose_1 = require("@nestjs/mongoose");
var env_constant_1 = require("./shared/constants/env.constant");
var db_constant_1 = require("./shared/constants/db.constant");
var app_provider_1 = require("./app.provider");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule_1 = AppModule;
    var AppModule_1;
    AppModule = AppModule_1 = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                mongoose_1.MongooseModule.forRoot(env_constant_1.ENV_CONFIG.database.url, {
                    connectionName: db_constant_1.DB_CONSTANT.connectionName["default"]
                }),
                core_1.RouterModule.register([
                    {
                        path: '/api/',
                        module: AppModule_1
                    },
                ]),
            ],
            controllers: [users_controller_1.UsersController],
            providers: __spreadArray([], app_provider_1.customProvider, true)
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
