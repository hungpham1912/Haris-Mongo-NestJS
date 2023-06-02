import { ComparisonOperators } from './models/repository.model';
export const MoreThan = (value): ComparisonOperators => {
  return {
    $gt: value,
  };
};
export const Equal = (value): ComparisonOperators => {
  return {
    $eq: value,
  };
};
export const MoreThanOrEqual = (value): ComparisonOperators => {
  return {
    $gte: value,
  };
};
export const LessThanOrEqual = (value): ComparisonOperators => {
  return {
    $lte: value,
  };
};
export const LessThan = (value): ComparisonOperators => {
  return {
    $lt: value,
  };
};
export const BetweenOrEqual = (first, second): ComparisonOperators => {
  return {
    $gte: first,
    $lte: second,
  };
};
export const Between = (first, second): ComparisonOperators => {
  return {
    $gt: first,
    $lt: second,
  };
};
export const In = (arr): ComparisonOperators => {
  return {
    $in: arr,
  };
};
export const NotIn = (arr): ComparisonOperators => {
  return {
    $nin: arr,
  };
};
