// base.entity.ts
import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}
