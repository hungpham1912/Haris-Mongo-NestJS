import { Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import {
  FindOptions,
  LogicalObject,
  ParamsQueryBuilder,
  MapOrderOption,
  MapFindOptions,
  RelationTypeEnum,
  FindOptionsOrder,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from './models/repository.model';
import { isArray } from 'class-validator';
import * as crypto from 'crypto';
import { RelationInstance } from './constants/relation.constant';

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
        .find({ ...mapQuery, deletedAt: { $ne: null } })
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
      return this.model.findOne({ ...query, deletedAt: { $ne: null } }).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  update(
    filter: FilterQuery<T>,
    body: QueryDeepPartialEntity<T>,
  ): Promise<any> {
    try {
      return this.model.updateMany(filter, body).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  delete(filter: FilterQuery<T>): Promise<any> {
    try {
      return this.model.deleteMany(filter).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  softDelete(filter: FilterQuery<T>): Promise<any> {
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
    private globalLookup?: any[],
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
    this.globalLookup = [];
    this.alias = this.model.name;
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
  lookup(from: string, asField: string) {
    const mapTable = RelationInstance.mappingTable;
    const relationArr = RelationInstance.relation;
    const { field, as, type, model, inverseAs } =
      relationArr[mapTable[from]].relations[asField];
    const { nameTable, relations } = relationArr[model];

    const $lookup = {
      from: nameTable,
      localField: field,
      foreignField: relations[inverseAs].field,
      as,
    };

    this.globalLookup.push({ $lookup });

    if (type === RelationTypeEnum.MTO)
      this.globalLookup.push({
        $unwind: {
          path: `$${as}`,
          preserveNullAndEmptyArrays: true,
        },
      });
    return this;
  }
  execute() {
    try {
      const query = [
        { $match: this.globalMatch },
        { $sort: this.globalSort },
        ...this.globalLookup,
      ];
      return this.model.aggregate(query).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
