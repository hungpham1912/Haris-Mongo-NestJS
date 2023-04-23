import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type InformationDocument = HydratedDocument<Information>;

@Schema({ timestamps: true })
export class Information extends BaseSchema {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  key: string;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
