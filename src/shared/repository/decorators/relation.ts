import { ObjectType } from 'typeorm';
import { RelationType, RelationTypeEnum } from '../models/repository.model';
import { RelationInstance } from '../constants/relation.constant';

const makeForeignKey = (propertyKey: string) => {
  return propertyKey + 'Id';
};

export function BuilderSchema(name?: string): ClassDecorator {
  return (target) => {
    RelationInstance.setTable(
      name ? name : target.name.trim().toLocaleLowerCase(),
      target.name,
    );
  };
}

export function MongoManyToOne<T>(
  typeFunctionOrTarget: (type?: any) => ObjectType<T>,
  inverseSide?: (object: T) => any,
): PropertyDecorator {
  const tss = typeFunctionOrTarget();
  console.log('🚀 ~ file: relation.ts:23 ~ tss:', tss.name);
  return (target: T, propertyKey: string) => {
    const param: RelationType = {
      // localField: makeForeignKey(propertyKey),
      foreignField: makeForeignKey(propertyKey),
      as: propertyKey,
      type: RelationTypeEnum.MTO,
    };
    RelationInstance.initRelation(
      param,
      target.constructor.name,
      target.constructor.name.trim().toLocaleLowerCase(),
      propertyKey,
    );

    Object.defineProperty(target, propertyKey, {
      get: typeFunctionOrTarget,
      set: inverseSide,
    });
  };
}

export function MongoOneToMany<T>(
  typeFunctionOrTarget: (type?: any) => ObjectType<T>,
  inverseSide?: (object: T) => any,
): PropertyDecorator {
  const inverse = typeFunctionOrTarget();
  console.log('🚀 ~ file: relation.ts:48 ~ tss:', inverse.name);

  return (target: ObjectType<T>, propertyKey: string) => {
    const param: RelationType = {
      localField: '_id',
      as: propertyKey,
      type: RelationTypeEnum.OTM,
    };
    RelationInstance.initRelation(
      param,
      target.constructor.name,
      target.constructor.name.trim().toLocaleLowerCase(),
      inverse.name,
    );

    Object.defineProperty(target, propertyKey, {
      get: typeFunctionOrTarget,
      set: inverseSide,
    });
  };
}
