import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';
import { Role } from '../models/users.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
