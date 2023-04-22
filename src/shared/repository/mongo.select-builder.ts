import { Model } from 'mongoose';
import {
  ParamsQueryBuilder,
  ProjectionOperators,
} from './models/repository.model';
import { Logger } from '@nestjs/common';

export class MongoSelectBuilder<T> {
  constructor(public model: Model<T>) {
    this.model;
    this.and = [];
    this.or = [];
  }
  private and: any[];
  private or: any[];

  andWhere(
    query:
      | ParamsQueryBuilder
      | ParamsQueryBuilder[]
      | ProjectionOperators
      | ProjectionOperators[],
  ) {
    this.and.push(query);
    return this;
  }
  orWhere(
    query:
      | ParamsQueryBuilder
      | ParamsQueryBuilder[]
      | ProjectionOperators
      | ProjectionOperators[],
  ) {
    this.or.push(query);
    return this;
  }
  select() {
    let match = {};
    if (this.or.length > 0) match = { ...match, $or: this.or };
    if (this.and.length > 0) match = { ...match, $and: this.and };
    try {
      return this.model
        .aggregate([{ $match: { ...match, deletedAt: null } }])
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  getModel() {
    return this.model;
  }
}
