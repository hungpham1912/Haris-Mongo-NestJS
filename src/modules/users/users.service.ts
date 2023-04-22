import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DB_CONSTANT } from 'src/shared/constants/db.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, DB_CONSTANT.connectionName.default)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }
}
