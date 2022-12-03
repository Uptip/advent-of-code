import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { min, sum } from 'lodash';
import { PowerSet } from 'js-combinatorics';

export const parseInput = (input: string): any => input.split('\n').map(Number);

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    new PowerSet(input).toArray().filter(array => sum(array) === 150).length,
);

export const partTwo: SolutionFunction | any = pipe(
  parseInput,
  input =>
    new PowerSet(input)
      .toArray()
      .filter(array => sum(array) === 150)
      .reduce(
        (acc, curr) => ({
          ...acc,
          [`${curr.length}`]: (acc[curr.length] || 0) + 1,
        }),
        {},
      ),
  grouped => grouped[min(Object.keys(grouped).map(Number))],
);
