import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { MongoManyToOne } from 'src/shared/repository/decorators/relation';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type InformationDocument = HydratedDocument<Information>;

@Schema({ timestamps: true })
export class Information extends BaseSchema {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({ required: true })
  key: string;

  @MongoManyToOne<User>(() => User, (user) => user.information)
  user: User;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
InformationSchema.add({ userId: mongoose.Schema.Types.ObjectId });
