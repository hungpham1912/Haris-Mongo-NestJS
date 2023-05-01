import { Injectable, Scope } from '@nestjs/common';
import { SortOrder } from 'mongoose';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

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
}

export interface MapFindOptions<T> extends FindOptions<T> {
  /**
   * New condition that should be applied to match entities.
   */
  mapQuery?: FindOptionsWhere<T> | FindOptionsWhere<T>[] | ParamsQueryBuilder;
  /**
   * Map order, in which entities should be ordered.
   */
  mapOrder?: MapOrderOption;
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
  localField?: string;
  foreignField?: string;
  as: string;
  type: RelationTypeEnum;
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
