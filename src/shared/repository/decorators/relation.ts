import {
  ObjectType,
  RelationType,
  RelationTypeEnum,
} from '../models/repository.model';
import { RelationInstance } from '../constants/relation.constant';

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
  inverseSide: string,
  localField?: string,
): PropertyDecorator {
  const inverseType = typeFunctionOrTarget();
  return initRelationByType(
    RelationTypeEnum.MTO,
    localField,
    inverseType,
    inverseSide,
  );
}

export function MongoOneToMany<T>(
  typeFunctionOrTarget: (type?: any) => ObjectType<T>,
  inverseSide: string,
  localField?: string,
): PropertyDecorator {
  const inverseType = typeFunctionOrTarget();
  return initRelationByType(
    RelationTypeEnum.OTM,
    localField,
    inverseType,
    inverseSide,
  );
}

const makeForeignKey = (propertyKey: string) => {
  return propertyKey + 'Id';
};

function initRelationByType<T>(
  type: RelationTypeEnum,
  localField: string,
  inverseType: ObjectType<T>,
  inverseSide: string,
): PropertyDecorator {
  return (target: T, propertyKey: string) => {
    let param: RelationType;
    switch (type) {
      case RelationTypeEnum.OTM:
        param = {
          field: localField ? localField : '_id',
          as: propertyKey,
          type,
          model: inverseType?.name ? inverseType?.name : null,
          inverseAs: inverseSide,
        };
        break;
      case RelationTypeEnum.MTO:
        param = {
          field: makeForeignKey(propertyKey),
          as: propertyKey,
          type,
          model: inverseType?.name ? inverseType?.name : null,
          inverseAs: inverseSide,
        };
        break;
      default:
        break;
    }

    RelationInstance.initRelation(
      param,
      target.constructor.name,
      target.constructor.name.trim().toLocaleLowerCase(),
      propertyKey,
      inverseSide,
    );
  };
}
