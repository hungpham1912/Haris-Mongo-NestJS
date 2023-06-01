import { MongodbRepository } from 'src/shared/repository/mongo.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';
import { Test } from './schemas/test.schema';

@Injectable()
export class TestRepository extends MongodbRepository<Test> {
  constructor(
    @InjectModel(Test.name, DB_CONSTANT.connectionName.default)
    model: Model<Test>,
  ) {
    super(model);
  }
}
