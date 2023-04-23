"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UUIDPipe = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var UUIDPipe = /** @class */ (function () {
    function UUIDPipe() {
    }
    UUIDPipe.prototype.transform = function (value, metadata) {
        if (!(0, class_validator_1.isUUID)(value)) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Validation failed ({".concat(metadata.data, "} must is UUID)"),
                error: 'ID_INVALID'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    };
    UUIDPipe = __decorate([
        (0, common_1.Injectable)()
    ], UUIDPipe);
    return UUIDPipe;
}());
exports.UUIDPipe = UUIDPipe;
