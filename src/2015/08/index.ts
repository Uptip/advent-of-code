import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): string[] => input.split('\n');

export const partOne: SolutionFunction = pipe(parseInput, input =>
  input.reduce((total, line) => total + line.length - eval(line).length, 0),
);

export const partTwo: SolutionFunction = pipe(parseInput, input =>
  input.reduce(
    (total, line) =>
      total +
      (2 +
        line.replace(/\\/g, '\\\\').replace(/"/g, '\\"').length -
        line.length),
    0,
  ),
);
