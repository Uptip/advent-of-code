import { pipe } from 'ramda';

export const parse = (input: string) => input.split('\n').map(Number);

export const partOne = pipe(parse, input => {
  let steps = 0;
  let index = 0;
  while (index < input.length) {
    const nextIndex = index + input[index];
    input[index] += 1;
    index = nextIndex;
    steps += 1;
  }
  return steps;
});

export const partTwo = pipe(parse, input => {
  let steps = 0;
  let index = 0;
  while (index < input.length) {
    const nextIndex = index + input[index];
    input[index] += input[index] >= 3 ? -1 : 1;
    index = nextIndex;
    steps += 1;
  }

  return steps;
});
