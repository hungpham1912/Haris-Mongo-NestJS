import { Model } from 'mongoose';
import {
  LogicalObject,
  ParamsQueryBuilder,
  ParamsSortBuilder,
} from './models/repository.model';
import { Logger } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

export class MongodbSelectBuilder<T> {
  constructor(public model: Model<T>) {
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
  orderBy(options: FindOptionsWhere<T> | ParamsSortBuilder) {
    let param;
    Object.entries(options).forEach((value) => {
      switch (value[1]) {
        case 'DESC':
          param = { ...param, [value[0]]: -1 };
          break;
        case 'ASC':
          param = { ...param, [value[0]]: 1 };
          break;
        default:
          param = { ...param, [value[0]]: 1 };
      }
    });
    this.globalSort = { ...this.globalSort, ...param };
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
