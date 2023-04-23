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

export interface ParamsQueryBuilder {
  [key: string]: ComparisonOperators;
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
