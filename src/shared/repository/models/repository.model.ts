import { FindOptionsWhere } from 'typeorm';

export interface FindOptions<T> {
  /**
   * Simple condition that should be applied to match entities.
   */
  where?: FindOptionsWhere<T>;
  /**
   * Offset (paginated) where from entities should be taken.
   */
  skip?: number;
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  take?: number;
}

export interface ParamsQueryBuilder {
  [key: string]: ProjectionOperators;
}

export interface ProjectionOperators {
  /**
   * ComparisonObject
   */
  $eq?;
  $gt?;
  $gte?;
  $in?;
  $lt?;
  $lte?;
  $ne?;
  $nin?;
  /**
   * LogicalObject
   */
  $and?;
  $not?;
  $nor?;
  $or?;
}
