import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type InformationDocument = HydratedDocument<Information>;

@Schema({ timestamps: true })
export class Information extends BaseSchema {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  key: string;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   user: User;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
