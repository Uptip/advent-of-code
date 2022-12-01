import { max, orderBy, sum } from 'lodash';
import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): number[][] => {
  return input.split('\n\n').map(group => group.split('\n').map(Number));
};

export const partOne: SolutionFunction = pipe(parseInput, input =>
  max(input.map(sum)),
);

export const partTwo: SolutionFunction = pipe(parseInput, input =>
  sum(orderBy(input.map(sum)).slice(-3)),
);
