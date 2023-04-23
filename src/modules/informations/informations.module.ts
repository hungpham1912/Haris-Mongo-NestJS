import { Module } from '@nestjs/common';
import { InformationService } from './informations.service';
import { InformationController } from './informations.controller';

@Module({
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
