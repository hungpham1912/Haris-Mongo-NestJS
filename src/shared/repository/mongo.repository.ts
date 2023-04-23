import { Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { FindOptionsWhere } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/driver/mongodb/typings';
import { FindOptions } from './models/repository.model';
import { MongodbSelectBuilder } from './mongo.select-builder';
import { isArray } from 'class-validator';

export class MongodbRepository<T> {
  constructor(public model: Model<T>) {
    this.model;
  }
  find(options?: FindOptions<T>): Promise<T[]> {
    const { where, skip, take } = options
      ? options
      : { where: {}, skip: null, take: null };
    let query = where;
    if (isArray(where)) query = { $or: where };
    try {
      return this.model
        .find({ ...query, deletedAt: { $eq: null } })
        .limit(take)
        .skip(skip)
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
