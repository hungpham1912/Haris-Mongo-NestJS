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
exports.MongodbRepository = exports.Repository = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var mongo_select_builder_1 = require("./mongo.select-builder");
var Repository = /** @class */ (function () {
    function Repository() {
        this.mapOrderOption = function (options) {
            var param;
            Object.entries(options).forEach(function (value) {
                var _a, _b, _c;
                switch (value[1]) {
                    case 'DESC' || 'desc':
                        param = __assign(__assign({}, param), (_a = {}, _a[value[0]] = -1, _a));
                        break;
                    case 'ASC' || 'asc':
                        param = __assign(__assign({}, param), (_b = {}, _b[value[0]] = 1, _b));
                        break;
                    default:
                        param = __assign(__assign({}, param), (_c = {}, _c[value[0]] = 1, _c));
                }
            });
            return param;
        };
    }
    return Repository;
}());
exports.Repository = Repository;
var MongodbRepository = /** @class */ (function (_super) {
    __extends(MongodbRepository, _super);
    function MongodbRepository(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.model;
        return _this;
    }
    MongodbRepository.prototype.find = function (options) {
        var _a = options
            ? options
            : { where: {}, skip: null, take: null, order: 1 }, where = _a.where, skip = _a.skip, take = _a.take, order = _a.order;
        var query = where;
        if ((0, class_validator_1.isArray)(where))
            query = { $or: where };
        try {
            return this.model
                .find(__assign(__assign({}, query), { deletedAt: { $eq: null } }))
                .limit(take)
                .skip(skip)
                .sort()
                .exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.create = function (object) {
        try {
            return new this.model(object);
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.findOne = function (options) {
        var where = (options ? options : { where: {} }).where;
        var query = where;
        if ((0, class_validator_1.isArray)(where))
            query = { $or: where };
        try {
            return this.model.findOne(__assign(__assign({}, query), { deletedAt: { $eq: null } })).exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.updateByQuery = function (filter, body) {
        try {
            return this.model.updateMany(filter, body).exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.deleteByQuery = function (filter) {
        try {
            return this.model.deleteMany(filter).exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.softDeleteByQuery = function (filter) {
        try {
            return this.model.updateMany(filter, { deletedAt: new Date() }).exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.count = function (query) {
        try {
            return this.model.count(__assign(__assign({}, query), { deletedAt: { $eq: null } })).exec();
        }
        catch (error) {
            common_1.Logger.error(error);
            throw error;
        }
    };
    MongodbRepository.prototype.createQueryBuilder = function () {
        return new mongo_select_builder_1.MongodbSelectBuilder(this.model);
    };
    return MongodbRepository;
}(Repository));
exports.MongodbRepository = MongodbRepository;
