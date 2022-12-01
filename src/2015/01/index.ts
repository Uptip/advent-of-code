import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): string[] => input.split('');

export const partOne: SolutionFunction = pipe(parseInput, input =>
  input.reduce((total, curr) => total + (curr === '(' ? 1 : -1), 0),
);

export const partTwo: SolutionFunction = pipe(parseInput, input => {
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    total += input[i] === '(' ? 1 : -1;
    if (total === -1) {
      return i + 1;
    }
  }
});
