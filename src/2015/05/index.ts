import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): string[] => input.split('\n');

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    input.filter(
      line =>
        /([aeiou].*){3}/.test(line) &&
        /(.)\1/.test(line) &&
        !/(ab)|(cd)|(pq)|(xy)/.test(line),
    ).length,
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  input =>
    input.filter(line => /(..).*\1/.test(line) && /(.).\1/.test(line)).length,
);
