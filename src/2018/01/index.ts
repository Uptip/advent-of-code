import { sum } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string): number[] =>
  input.split('\n').map(Number);

export const partOne = pipe(parseInput, sum);

export const partTwo = pipe(parseInput, input => {
  let index = 0;
  let total = 0;
  let known = new Set<number>();

  while (true) {
    let number = input[index % input.length];
    total += number;
    if (known.has(total)) {
      return total;
    }
    known.add(total);
    index++;
  }
});
