import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserSchema } from './schemas/user.schema';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      DB_CONSTANT.connectionName.default,
    ),
  ],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
