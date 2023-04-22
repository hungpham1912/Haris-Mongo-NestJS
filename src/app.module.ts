import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_CONFIG } from './shared/constants/env.constant';
import { DB_CONSTANT } from './shared/constants/db.constant';
import { customProvider } from './app.provider';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(ENV_CONFIG.database.url, {
      connectionName: DB_CONSTANT.connectionName.default,
    }),
    RouterModule.register([
      {
        path: '/api/',
        module: AppModule,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [...customProvider],
})
export class AppModule {}
