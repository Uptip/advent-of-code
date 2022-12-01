import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { min } from 'lodash';

export const parseInput = (input: string): number[][] =>
  input
    .split('\n')
    .filter(Boolean)
    .map(line => line.split('x').map(Number));

export const partOne: SolutionFunction = pipe(parseInput, input =>
  input.reduce(
    (total, [l, w, h]) =>
      total + 2 * l * w + 2 * w * h + 2 * h * l + min([l * w, w * h, h * l]),
    0,
  ),
);

export const partTwo: SolutionFunction = pipe(parseInput, input =>
  input.reduce(
    (total, [l, w, h]) =>
      total + min([2 * l + 2 * w, 2 * w + 2 * h, 2 * l + 2 * h]) + l * w * h,
    0,
  ),
);
