import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const createdCat = this.userRepository.create(createUserDto);
    return await createdCat.save();
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ _id: id }, updateUserDto);
  }

  async remove(id: string) {
    return;
  }
}
