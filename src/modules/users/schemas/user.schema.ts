import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';
import { Role } from '../models/users.model';
import { Information } from 'src/modules/informations/schemas/information.schema';
import { ManyToOne } from 'typeorm';
import {
  BuilderSchema,
  MongoManyToOne,
  MongoOneToMany,
} from 'src/shared/repository/decorators/relation';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@BuilderSchema('users')
export class User extends BaseSchema {
  @Prop({ required: true })
  password: string;

  @Prop({ default: false, required: true })
  verifyPhone: boolean;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, enum: Role, default: Role.USER })
  role: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @MongoOneToMany(() => Information, (information) => information.user)
  information: Information[];
}

export const UserSchema = SchemaFactory.createForClass(User);
