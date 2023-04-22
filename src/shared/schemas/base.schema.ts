import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export class BaseSchema {
  _id: ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}
