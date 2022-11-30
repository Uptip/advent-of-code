import { run } from '../utils/index';

export const formatInput = (input: string): number[] =>
  input.replace(/\n$/, '').split('\n').map(Number);

export const partOne = (input: number[]): any =>
  input
    .sort((a, b) => a - b)
    .reduce(
      ({ oneJolt, threeJolt, lastValue }, curr) => {
        if (curr - lastValue === 1) {
          oneJolt += 1;
        } else {
          threeJolt += 1;
        }

        return {
          oneJolt,
          threeJolt,
          lastValue: curr,
        };
      },
      {
        oneJolt: 0,
        threeJolt: 1,
        lastValue: 0,
      },
    );

export const partTwo = (input: number[]): any => {};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '10/input.txt', partOne, partTwo, formatInput });
}
