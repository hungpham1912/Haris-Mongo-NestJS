import { Module } from '@nestjs/common';
import { InformationService } from './informations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from './schemas/information.schema';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';
import { InformationRepository } from './information.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Information.name, schema: InformationSchema }],
      DB_CONSTANT.connectionName.default,
    ),
  ],
  providers: [InformationService, InformationRepository],
  exports: [InformationService, InformationRepository],
})
export class InformationModule {}
