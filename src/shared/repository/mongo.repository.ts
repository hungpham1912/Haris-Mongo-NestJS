import { Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { DeepPartial, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/driver/mongodb/typings';
import {
  FindOptions,
  LogicalObject,
  ParamsQueryBuilder,
  MapOrderOption,
  MapFindOptions,
} from './models/repository.model';
import { isArray } from 'class-validator';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import * as crypto from 'crypto';
export class Repository<T> {
  mapOrderOption = (options: FindOptionsOrder<T>): MapOrderOption => {
    let param: MapOrderOption = { createdAt: -1 };
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
  mapFindOption = (options: FindOptions<T>): MapFindOptions<T> => {
    /**
     * Default value for options.
     */
    const { where, skip, take, order } = options
      ? options
      : { where: {}, skip: null, take: null, order: {} };
    /**
     * Default value for query.
     */
    let mapQuery = where;
    /**
     * Handle operator for options.
     */
    if (isArray(where)) mapQuery = { $or: where };
    return { mapQuery, skip, take, mapOrder: this.mapOrderOption(order) };
  };
  mapJoinAndSelect = (parma: string): string => {
    /**
     * Handle value for options.
     */
    const arrAlias = parma.split('.');
    /**
     * Default value for options.
     */
    let alias: string = crypto.randomUUID();
    switch (arrAlias.length) {
      case 1:
        alias = arrAlias[0];
        break;
      case 2:
        alias = arrAlias[1];
        break;
      default:
        break;
    }
    return alias;
  };
}
export class MongodbRepository<T> extends Repository<T> {
  constructor(public model: Model<T>) {
    super();
    this.model;
  }
  find(options?: FindOptions<T>): Promise<T[]> {
    const { mapOrder, mapQuery, skip, take } = this.mapFindOption(options);
    try {
      return this.model
        .find({ ...mapQuery, deletedAt: { $eq: null } })
        .limit(take)
        .skip(skip)
        .sort(mapOrder)
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  create(object: DeepPartial<T>) {
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
  update(
    filter: FilterQuery<T>,
    body: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    try {
      return this.model.updateMany(filter, body).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  delete(filter: FilterQuery<T>): Promise<DeleteResult> {
    try {
      return this.model.deleteMany(filter).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  softDelete(filter: FilterQuery<T>): Promise<UpdateResult> {
    try {
      return this.model.updateMany(filter, { deletedAt: new Date() }).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  count(query?: FilterQuery<T>) {
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
 *`
 */
class MongodbSelectBuilder<T> extends Repository<T> {
  constructor(
    public model: Model<T>,
    private globalSort?,
    private globalMatch?,
    private globalLookup?,
    private and?: any[],
    private or?: any[],
    private alias?: string,
  ) {
    super();
    this.model;
    this.and = [];
    this.or = [];
    this.globalMatch = { deletedAt: null };
    this.globalSort = { createdAt: -1 };
    this.globalLookup = {};
    this.alias = this.model.name;
    console.log(
      '🚀 ~ file: mongo.repository.ts:175 ~ MongodbSelectBuilder<T> ~ this.alias:',
      this.model,
    );
  }

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
  leftJoinAndSelect(
    from: string,
    localField: string,
    foreignField: string,
    relation: 'MTO' | 'OTM',
  ) {
    this.globalLookup = {
      from,
      localField,
      foreignField,
      as: '',
    };
    return this;
  }
  execute() {
    try {
      return this.model
        .aggregate([
          { $match: this.globalMatch },
          { $sort: this.globalSort },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'information',
            },
          },
        ])
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
