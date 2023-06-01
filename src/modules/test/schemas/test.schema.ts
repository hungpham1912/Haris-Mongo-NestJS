import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Demo } from 'src/modules/demo/schemas/demo.schema';
import { Information } from 'src/modules/informations/schemas/information.schema';
import { User } from 'src/modules/users/schemas/user.schema';
import {
  BuilderSchema,
  MongoManyToOne,
  MongoOneToMany,
} from 'src/shared/repository/decorators/relation';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type TestDocument = HydratedDocument<Information>;

@Schema({ timestamps: true })
@BuilderSchema('tests')
export class Test extends BaseSchema {
  @MongoManyToOne(() => Information, 'tests')
  information: Information;

  @Prop({
    required: true,
  })
  informationId: string;

  @MongoOneToMany(() => User, 'tests')
  user: User[];

  // @MongoManyToOne(() => Demo, (demo) => demo._id)
  // demo: Demo;
}

export const TestSchema = SchemaFactory.createForClass(Test);
TestSchema.add({ informationId: mongoose.Schema.Types.ObjectId });
