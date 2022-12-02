import { sum, isPlainObject } from 'lodash';
import { SolutionFunction } from '../../types';

export const partOne: SolutionFunction = input =>
  sum(input.match(/-?\d+/g).map(Number));

export const partTwo: SolutionFunction = input =>
  partOne(
    JSON.stringify(
      JSON.parse(input, (_, value) =>
        isPlainObject(value) && Object.values(value).includes('red')
          ? ''
          : value,
      ),
    ),
  );
