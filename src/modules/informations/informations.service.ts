import { Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { InformationRepository } from './information.repository';

@Injectable()
export class InformationService {
  constructor(public readonly informationRepository: InformationRepository) {}

  create(userId: string) {
    const sd = this.informationRepository.create({
      userId,
      key: 'adasddas',
    });
    return sd.save();
  }

  findAll() {
    return `This action returns all informations`;
  }

  async get() {
    return await this.informationRepository
      .createQueryBuilder()
      .select()
      .orderBy({ createdAt: 'ASC' })
      .lookup('information', 'user')
      .execute();
  }
}
