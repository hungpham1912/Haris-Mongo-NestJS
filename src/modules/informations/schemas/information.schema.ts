import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Test } from 'src/modules/test/schemas/test.schema';
import { User } from 'src/modules/users/schemas/user.schema';
import {
  BuilderSchema,
  MongoManyToOne,
  MongoOneToMany,
} from 'src/shared/repository/decorators/relation';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type InformationDocument = HydratedDocument<Information>;

@Schema({ timestamps: true })
@BuilderSchema('information')
export class Information extends BaseSchema {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({ required: true })
  key: string;

  @MongoManyToOne(() => User, 'information')
  user: User;

  @MongoOneToMany(() => Test, 'information')
  tests: Test[];
}

export const InformationSchema = SchemaFactory.createForClass(Information);
InformationSchema.add({ userId: mongoose.Schema.Types.ObjectId });
