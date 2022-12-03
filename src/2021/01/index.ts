import { pipe } from 'ramda';

export const parseInput = (input: string): number[] =>
  input.split('\n').filter(Boolean).map(Number);

export const partOne = pipe(parseInput, input =>
  input.reduce(
    (acc, _, index) =>
      acc + Number(index >= 1 && input[index] > input[index - 1]),
    0,
  ),
);

export const partTwo = pipe(parseInput, input =>
  input.reduce(
    (acc, _, index) =>
      acc +
      Number(
        index >= 3 &&
          input[index] + input[index - 1] + input[index - 2] >
            input[index - 1] + input[index - 2] + input[index - 3],
      ),
    0,
  ),
);
