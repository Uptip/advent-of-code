import { pipe } from 'ramda';

export const parse = (input: string): string[] => input.split('');

export const partOne = pipe(parse, input =>
  input.reduce(
    (acc, curr, index) =>
      acc +
      (curr === input[(index + input.length + 1) % input.length]
        ? Number(curr)
        : 0),
    0,
  ),
);

export const partTwo = pipe(parse, input =>
  input.reduce(
    (acc, curr, index) =>
      acc +
      (curr === input[(index + input.length + input.length / 2) % input.length]
        ? Number(curr)
        : 0),
    0,
  ),
);
