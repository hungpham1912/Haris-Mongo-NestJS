import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserRepository } from './user.repository';
import { Equal, MoreThan } from 'src/shared/repository/helper';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const createdCat = this.userRepository.create(createUserDto);
    return await createdCat.save();
  }

  async findAll() {
    return await this.userRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { _id: id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ _id: id }, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.softDelete({ _id: id });
  }

  async count() {
    return await this.userRepository.count();
  }

  async get() {
    const es = await this.userRepository
      .createQueryBuilder()
      .orderBy({ createdAt: 'ASC' })
      .lookup('users', 'information')
      .lookup('users', 'tests')
      .withDeleted()
      .execute();
    return es;
  }
}
