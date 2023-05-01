import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import {
  BuilderSchema,
  MongoManyToOne,
} from 'src/shared/repository/decorators/relation';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type InformationDocument = HydratedDocument<Information>;

class sdasd {
  information;
}
@Schema({ timestamps: true })
// @BuilderSchema('information')
export class Information extends BaseSchema {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({ required: true })
  key: string;

  @MongoManyToOne(() => sdasd, (user) => user.information)
  user: User;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
InformationSchema.add({ userId: mongoose.Schema.Types.ObjectId });
