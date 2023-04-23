"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var base_schema_1 = require("../../../shared/schemas/base.schema");
var users_model_1 = require("../models/users.model");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)({ "default": false, required: true })
    ], User.prototype, "verifyPhone");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "fullName");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, "enum": users_model_1.Role, "default": users_model_1.Role.USER })
    ], User.prototype, "role");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "phone");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "email");
    User = __decorate([
        (0, mongoose_1.Schema)({ timestamps: true })
    ], User);
    return User;
}(base_schema_1.BaseSchema));
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
