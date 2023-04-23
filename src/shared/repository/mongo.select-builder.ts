import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import { ParamsQueryBuilder, LogicalObject } from './models/repository.model';
import { Repository } from './mongo.repository';

export class MongodbSelectBuilder<T> extends Repository<T> {
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
