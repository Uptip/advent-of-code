import { range } from 'lodash';
import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): number[] =>
  input
    .split('\n')
    .filter(Boolean)
    .map(boardingPass =>
      boardingPass
        .split('')
        .map(char => (['F', 'L'].includes(char) ? '0' : '1'))
        .join(''),
    )
    .map(binaryString => parseInt(binaryString, 2));

export const partOne: SolutionFunction = pipe(parseInput, input =>
  Math.max(...input),
);

export const partTwo = (input: string) => {};
