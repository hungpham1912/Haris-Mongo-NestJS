import { type } from 'os';
import { User } from 'src/modules/users/schemas/user.schema';
import { ObjectType, RelationOptions } from 'typeorm';

export function MongoManyToOne<T>(
  typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
  inverseSide?: string | ((object: T) => any),
  options?: RelationOptions,
): PropertyDecorator {
  console.log('🚀 ~ file: relation.ts:6 ~ typeFunctionOrTarget:', type);

  return (target: T, propertyKey: string) => {
    console.log('🚀 ~ file: relation.ts:7 ~ options:', target);
  };
}

export function MongoOneToMany<T>(
  typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
  inverseSide?: string | ((object: T) => any),
  options?: RelationOptions,
): PropertyDecorator {
  console.log('🚀 ~ file: relation.ts:6 ~ typeFunctionOrTarget:', type);

  return (target: T, propertyKey: string) => {
    console.log('🚀 ~ file: relation.ts:7 ~ options:', target);
  };
}
