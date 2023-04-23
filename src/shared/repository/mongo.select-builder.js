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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.MongodbSelectBuilder = void 0;
var common_1 = require("@nestjs/common");
var mongo_repository_1 = require("./mongo.repository");
var MongodbSelectBuilder = /** @class */ (function (_super) {
    __extends(MongodbSelectBuilder, _super);
    function MongodbSelectBuilder(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.model;
        _this.and = [];
        _this.or = [];
        _this.globalMatch = { deletedAt: null };
        _this.globalSort = { createdAt: -1 };
        return _this;
    }
    MongodbSelectBuilder.prototype.andWhere = function (query) {
        this.and.push(query);
        return this;
    };
    MongodbSelectBuilder.prototype.orWhere = function (query) {
        this.or.push({ $or: query });
        return this;
    };
    MongodbSelectBuilder.prototype.select = function () {
        if (this.or.length > 0)
            this.globalMatch = __assign(__assign({}, this.globalMatch), { $or: this.or });
        if (this.and.length > 0)
            this.globalMatch = __assign(__assign({}, this.globalMatch), { $and: this.and });
        return this;
    };
    MongodbSelectBuilder.prototype.orderBy = function (options) {
        return this;
    };
    MongodbSelectBuilder.prototype.getModel = function () {
        return this.model;
    };
    MongodbSelectBuilder.prototype.execute = function () {
        try {
            return this.model
                .aggregate([{ $match: this.globalMatch }, { $sort: this.globalSort }])
                .exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    return MongodbSelectBuilder;
}(mongo_repository_1.Repository));
exports.MongodbSelectBuilder = MongodbSelectBuilder;
