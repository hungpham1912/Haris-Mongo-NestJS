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
