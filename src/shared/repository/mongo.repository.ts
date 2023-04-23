import { Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/driver/mongodb/typings';
import {
  FindOptions,
  LogicalObject,
  ParamsQueryBuilder,
  SortOptionOrder,
} from './models/repository.model';
import { isArray } from 'class-validator';

export class Repository<T> {
  mapOrderOption = (options: FindOptionsOrder<T>): SortOptionOrder => {
    let param: SortOptionOrder = { createdAt: -1 };
    Object.entries(options ? options : {}).forEach((value) => {
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
      : { where: {}, skip: null, take: null, order: {} };
    let query = where;
    if (isArray(where)) query = { $or: where };
    try {
      return this.model
        .find({ ...query, deletedAt: { $eq: null } })
        .limit(take)
        .skip(skip)
        .sort(this.mapOrderOption(order))
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

/**
 *
 *
 * Select Query Builder
 * Use for case queries complicated
 *
 *
 */
class MongodbSelectBuilder<T> extends Repository<T> {
  constructor(public model: Model<T>) {
    super();
    this.model;
    this.and = [];
    this.or = [];
    this.globalMatch = { deletedAt: null };
    this.globalSort = { createdAt: -1 };
  }
  private globalSort;
  private globalMatch;
  private and: any[];
  private or: any[];

  andWhere(query: ParamsQueryBuilder | LogicalObject<T> | FindOptionsWhere<T>) {
    this.and.push(query);
    return this;
  }
  orWhere(
    query: LogicalObject<T>[] | FindOptionsWhere<T>[] | ParamsQueryBuilder[],
  ) {
    this.or.push({ $or: query });
    return this;
  }
  select() {
    if (this.or.length > 0)
      this.globalMatch = { ...this.globalMatch, $or: this.or };
    if (this.and.length > 0)
      this.globalMatch = { ...this.globalMatch, $and: this.and };
    return this;
  }
  orderBy(options: FindOptionsOrder<T>) {
    this.globalSort = this.mapOrderOption(options);
    return this;
  }
  getModel() {
    return this.model;
  }
  execute() {
    try {
      return this.model
        .aggregate([{ $match: this.globalMatch }, { $sort: this.globalSort }])
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
