import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InformationService } from './informations.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Information')
@Controller('')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Post('users/:userId/information')
  create(@Param('userId') userId: string) {
    return this.informationService.create(userId);
  }

  @Get('information')
  findAll() {
    return this.informationService.findAll();
  }

  @Get('information/ss')
  ss() {
    return this.informationService.get();
  }
}
