import { MongodbRepository } from 'src/shared/repository/mongo.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';
import { Information } from './schemas/information.schema';

@Injectable()
export class InformationRepository extends MongodbRepository<Information> {
  constructor(
    @InjectModel(Information.name, DB_CONSTANT.connectionName.default)
    model: Model<Information>,
  ) {
    super(model);
  }
}
