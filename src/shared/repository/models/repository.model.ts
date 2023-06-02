import { SortOrder } from 'mongoose';

export type ObjectType<T> =
  | {
      new (): T;
    }
  // eslint-disable-next-line @typescript-eslint/ban-types
  | Function;

/**
 * Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties.
 */
export type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);

/**
 * Make all properties in T optional
 */
export type QueryPartialEntity<T> = {
  [P in keyof T]?: T[P] | (() => string);
};
/**
 * Make all properties in T optional. Deep version.
 */
export type QueryDeepPartialEntity<T> = _QueryDeepPartialEntity<
  ObjectLiteral extends T ? unknown : T
>;
type _QueryDeepPartialEntity<T> = {
  [P in keyof T]?:
    | (T[P] extends Array<infer U>
        ? Array<_QueryDeepPartialEntity<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<_QueryDeepPartialEntity<U>>
        : _QueryDeepPartialEntity<T[P]>)
    | (() => string);
};
/**
 * Value of order by in find options.
 */
export type FindOptionsOrderValue =
  | 'ASC'
  | 'DESC'
  | 'asc'
  | 'desc'
  | 1
  | -1
  | {
      direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
      nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
    };

/**
 * A single property handler for FindOptionsOrder.
 */
export type FindOptionsOrderProperty<Property> = Property extends Promise<
  infer I
>
  ? FindOptionsOrderProperty<NonNullable<I>>
  : Property extends Array<infer I>
  ? FindOptionsOrderProperty<NonNullable<I>>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  Property extends Function
  ? never
  : Property extends string
  ? FindOptionsOrderValue
  : Property extends number
  ? FindOptionsOrderValue
  : Property extends boolean
  ? FindOptionsOrderValue
  : Property extends Buffer
  ? FindOptionsOrderValue
  : Property extends Date
  ? FindOptionsOrderValue
  : Property extends object
  ? FindOptionsOrder<Property> | FindOptionsOrderValue
  : FindOptionsOrderValue;
/**
 * Order by find options.
 */
export type FindOptionsOrder<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsOrderProperty<NonNullable<Entity[P]>>;
};

export declare class EqualOperator<T> extends FindOperator<T> {
  readonly '@instanceof': symbol;
  constructor(value: T | FindOperator<T>);
}

export interface ObjectLiteral {
  [key: string]: any;
}

export interface ValueTransformer {
  /**
   * Used to marshal data when writing to the database.
   */
  to(value: any): any;
  /**
   * Used to unmarshal data when reading from the database.
   */
  from(value: any): any;
}

type SqlGeneratorType = (aliasPath: string) => string;

export declare class FindOperator<T> {
  readonly '@instanceof': symbol;
  /**
   * Operator type.
   */
  private _type;
  /**
   * Parameter value.
   */
  private _value;
  /**
   * ObjectLiteral parameters.
   */
  private _objectLiteralParameters;
  /**
   * Indicates if parameter is used or not for this operator.
   */
  private _useParameter;
  /**
   * Indicates if multiple parameters must be used for this operator.
   */
  private _multipleParameters;
  /**
   * SQL generator
   */
  private _getSql;
  constructor(
    type: FindOperatorType,
    value: T | FindOperator<T>,
    useParameter?: boolean,
    multipleParameters?: boolean,
    getSql?: SqlGeneratorType,
    objectLiteralParameters?: ObjectLiteral,
  );
  /**
   * Indicates if parameter is used or not for this operator.
   * Extracts final value if value is another find operator.
   */
  get useParameter(): boolean;
  /**
   * Indicates if multiple parameters must be used for this operator.
   * Extracts final value if value is another find operator.
   */
  get multipleParameters(): boolean;
  /**
   * Gets the Type of this FindOperator
   */
  get type(): FindOperatorType;
  /**
   * Gets the final value needs to be used as parameter value.
   */
  get value(): T;
  /**
   * Gets ObjectLiteral parameters.
   */
  get objectLiteralParameters(): ObjectLiteral | undefined;
  /**
   * Gets the child FindOperator if it exists
   */
  get child(): FindOperator<T> | undefined;
  /**
   * Gets the SQL generator
   */
  get getSql(): SqlGeneratorType | undefined;
  transformValue(transformer: ValueTransformer | ValueTransformer[]): void;
}

/**
 * List of types that FindOperator can be.
 */
export type FindOperatorType =
  | 'not'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'moreThan'
  | 'moreThanOrEqual'
  | 'equal'
  | 'between'
  | 'in'
  | 'any'
  | 'isNull'
  | 'ilike'
  | 'like'
  | 'raw'
  | 'arrayContains'
  | 'arrayContainedBy'
  | 'arrayOverlap'
  | 'and'
  | 'jsonContains';

export type FindOptionsWhereProperty<
  PropertyToBeNarrowed,
  Property = PropertyToBeNarrowed,
> = PropertyToBeNarrowed extends Promise<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends Array<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  PropertyToBeNarrowed extends Function
  ? never
  : PropertyToBeNarrowed extends Buffer
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends Date
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends string
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends number
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends boolean
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends object
  ?
      | FindOptionsWhere<Property>
      | FindOptionsWhere<Property>[]
      | EqualOperator<Property>
      | FindOperator<any>
      | boolean
  : Property | FindOperator<Property>;
/**
 * Used for find operations.
 */

export type FindOptionsWhere<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsWhereProperty<NonNullable<Entity[P]>>;
};

export interface FindOptions<T> {
  /**
   * Simple condition that should be applied to match entities.
   */
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  /**
   * Offset (paginated) where from entities should be taken.
   */
  skip?: number;
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  take?: number;
  /**
   * Order, in which entities should be ordered.
   */
  order?: FindOptionsOrder<T>;
  /**
   * Return data with deletedAt.
   */
  withDeleted?: boolean;
}

export interface MapFindOptions<T> extends FindOptions<T> {
  /**
   * New condition that should be applied to match entities.
   */
  mapQuery:
    | FindOptionsWhere<T>
    | FindOptionsWhere<T>[]
    | ParamsQueryBuilder
    | any;
  /**
   * Map order, in which entities should be ordered.
   */
  mapOrder: MapOrderOption;
}

export interface MapOrderOption {
  [key: string]: SortOrder;
}

export interface ParamsQueryBuilder {
  [key: string]:
    | ComparisonOperators
    | ComparisonOperators[]
    | ParamsQueryBuilder
    | ParamsQueryBuilder[];
}

/**
 * Comparison object
 */
export interface ComparisonOperators {
  $eq?;
  $gt?;
  $gte?;
  $in?;
  $lt?;
  $lte?;
  $ne?;
  $nin?;
}

/**
 * Logical object
 */
export interface LogicalObject<T> {
  $and?: ParamsQueryBuilder[] | FindOptionsWhere<T>[];
  $not?;
  $nor?;
  $or?: ParamsQueryBuilder[] | FindOptionsWhere<T>[];
}

export interface RelationType {
  field?: string;
  as?: string;
  model?: string;
  type?: RelationTypeEnum;
  inverseAs?: string;
}

export interface SpaceRelation {
  [name: string]: {
    relations: { [key: string]: RelationType };
    nameTable: string;
  };
}

export interface MappingTable {
  [name: string]: string;
}

export enum RelationTypeEnum {
  OTM = 'OTM',
  MTO = 'MTO',
}
