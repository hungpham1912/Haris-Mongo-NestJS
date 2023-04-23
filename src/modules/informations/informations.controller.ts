import { Controller, Get, Post, Body } from '@nestjs/common';
import { InformationService } from './informations.service';
import { CreateInformationDto } from './dto/create-information.dto';

@Controller('')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Post('users/:userId/information')
  create(@Body() createInformationDto: CreateInformationDto) {
    return this.informationService.create(createInformationDto);
  }

  @Get('information')
  findAll() {
    return this.informationService.findAll();
  }
}
