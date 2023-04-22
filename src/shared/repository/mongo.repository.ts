import { Logger } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { FindOptionsWhere } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/driver/mongodb/typings';

export class MongoRepository<T> {
  constructor(private model: Model<T>) {
    this.model;
  }
  find(query?: FindOptionsWhere<T>): Promise<T[]> {
    try {
      return this.model.find(query).exec();
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
  findOne(query?: FindOptionsWhere<T>): Promise<T> {
    try {
      return this.model.findOne(query).exec();
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
}
