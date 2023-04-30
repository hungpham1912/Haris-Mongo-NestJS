import { type } from 'os';
import { Information } from 'src/modules/informations/schemas/information.schema';
import { User } from 'src/modules/users/schemas/user.schema';
import { ObjectType, RelationOptions } from 'typeorm';
import {
  RelationType,
  RelationTypeEnum,
  SpaceRelation,
} from '../models/repository.model';
import { RelationInstance } from '../constants/relation.constant';
export function BuilderSchema<T>(name?: string): ClassDecorator {
  return (target) => {
    RelationInstance.setTable(
      name ? name : target.name.trim().toLocaleLowerCase(),
      target.name,
    );
  };
}

export function MongoManyToOne<T>(
  typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
  inverseSide?: string | ((object: T) => any),
  options?: RelationOptions,
): PropertyDecorator {
  return (target: T, propertyKey: string) => {};
}

export function MongoOneToMany<T>(
  typeFunctionOrTarget: (type?: any) => ObjectType<T>,
  inverseSide?: (object: T) => any,
): PropertyDecorator {
  // const ad = typeFunctionOrTarget();
  // const asd: Object<T>;
  // const ts = inverseSide(asd);
  return (target: ObjectType<T>, propertyKey: string) => {
    const param: RelationType = {
      localField: '_id',
      foreignField: '',
      as: propertyKey,
      type: RelationTypeEnum.OTM,
    };
    console.log('🚀 ~ file: relation.ts:42 ~ return ~ param:', param);
    RelationInstance.initRelation(param, target.constructor.name);
    // };

    Object.defineProperty(target, propertyKey, {
      get: typeFunctionOrTarget,
      set: inverseSide,
    });
  };
}
