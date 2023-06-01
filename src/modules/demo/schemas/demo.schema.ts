import { Schema } from '@nestjs/mongoose';
import { Information } from 'src/modules/informations/schemas/information.schema';
import { Test } from 'src/modules/test/schemas/test.schema';
import { User } from 'src/modules/users/schemas/user.schema';
import {
  MongoManyToOne,
  MongoOneToMany,
} from 'src/shared/repository/decorators/relation';
import { BaseSchema } from 'src/shared/schemas/base.schema';

@Schema({ timestamps: true })
export class Demo extends BaseSchema {
  // @MongoManyToOne(() => Information, (information) => information._id)
  // information: Information;
  // @MongoManyToOne(() => Test, (test) => test._id)
  // test: Test;
  // @MongoOneToMany(() => User, (user) => user.test)
  // user: User[];
}
