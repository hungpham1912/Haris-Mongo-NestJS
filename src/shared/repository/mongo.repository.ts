import { Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/driver/mongodb/typings';
import {
  FindOptions,
  LogicalObject,
  ParamsQueryBuilder,
} from './models/repository.model';
import { isArray } from 'class-validator';
import { MongodbSelectBuilder } from './mongo.select-builder';

export class Repository<T> {
  mapOrderOption = (options: FindOptionsOrder<T>) => {
    let param;
    Object.entries(options).forEach((value) => {
      switch (value[1]) {
        case 'DESC' || 'desc':
          param = { ...param, [value[0]]: -1 };
          break;
        case 'ASC' || 'asc':
          param = { ...param, [value[0]]: 1 };
          break;
        default:
          param = { ...param, [value[0]]: 1 };
      }
    });
    return param;
  };
}
export class MongodbRepository<T> extends Repository<T> {
  constructor(public model: Model<T>) {
    super();
    this.model;
  }
  find(options?: FindOptions<T>): Promise<T[]> {
    const { where, skip, take, order } = options
      ? options
      : { where: {}, skip: null, take: null, order: 1 };
    let query = where;
    if (isArray(where)) query = { $or: where };
    try {
      return this.model
        .find({ ...query, deletedAt: { $eq: null } })
        .limit(take)
        .skip(skip)
        .sort()
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  create(object: any) {
    try {
      return new this.model(object);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  findOne(options?: FindOptions<T>): Promise<T> {
    const { where } = options ? options : { where: {} };
    let query = where;
    if (isArray(where)) query = { $or: where };
    try {
      return this.model.findOne({ ...query, deletedAt: { $eq: null } }).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  updateByQuery(
    filter: FilterQuery<T>,
    body: FindOptionsWhere<T>,
  ): Promise<UpdateResult> {
    try {
      return this.model.updateMany(filter, body).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  deleteByQuery(filter: FilterQuery<T>): Promise<DeleteResult> {
    try {
      return this.model.deleteMany(filter).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  softDeleteByQuery(filter: FilterQuery<T>): Promise<UpdateResult> {
    try {
      return this.model.updateMany(filter, { deletedAt: new Date() }).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  count(query?: FindOptionsWhere<T>) {
    try {
      return this.model.count({ ...query, deletedAt: { $eq: null } }).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  createQueryBuilder() {
    return new MongodbSelectBuilder<T>(this.model);
  }
}
