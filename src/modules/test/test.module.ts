import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './schemas/test.schema';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Test.name, schema: TestSchema }],
      DB_CONSTANT.connectionName.default,
    ),
  ],
  providers: [TestService, TestRepository],
  exports: [TestService, TestRepository],
})
export class TestModule {}
