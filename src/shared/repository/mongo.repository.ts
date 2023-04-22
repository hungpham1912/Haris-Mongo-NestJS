import { FilterQuery, Model } from 'mongoose';
import { FindOptionsWhere } from 'typeorm';

export class MongoRepository<T> {
  constructor(private model: Model<T>) {
    this.model;
  }

  find(query?: FindOptionsWhere<T>): Promise<T[]> {
    return this.model.find(query).exec();
  }

  create(object: any) {
    return new this.model(object);
  }

  findOne(query?: FindOptionsWhere<T>): Promise<T> {
    return this.model.findOne(query).exec();
  }
  update(filter: FilterQuery<T>, body: FindOptionsWhere<T>) {
    return this.model.updateOne(filter, body);
  }
}
