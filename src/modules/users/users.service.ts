import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const createdCat = this.userRepository.create(createUserDto);
    return await createdCat.save();
  }

  async findAll() {
    return await this.userRepository.find({ skip: 1 });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { _id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateByQuery({ _id: id }, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.softDeleteByQuery({ _id: id });
  }

  async count() {
    return await this.userRepository.count();
  }

  async get() {
    return await this.userRepository
      .createQueryBuilder()
      .andWhere({
        $or: [{ fullName: { $eq: 'h' } }, { fullName: { $eq: 'g' } }],
      })
      .select();
  }
}
