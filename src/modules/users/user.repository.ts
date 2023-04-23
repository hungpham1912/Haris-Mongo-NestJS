import { MongodbRepository } from 'src/shared/repository/mongo.repository';
import { User } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';

@Injectable()
export class UserRepository extends MongodbRepository<User> {
  constructor(
    @InjectModel(User.name, DB_CONSTANT.connectionName.default)
    userModel: Model<User>,
  ) {
    super(userModel);
  }
}
