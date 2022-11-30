import { run } from '../utils/index';

export const formatInput = (input: string): string[][] =>
  input
    .replace(/\n$/, '')
    .split('\n\n')
    .map(group => group.split('\n'));

export const partOne = (input: string[][]): number =>
  input
    .map(group => new Set(group.join('')).size)
    .reduce((total, current) => total + current, 0);

export const partTwo = (input: string[][]): number =>
  input
    .map(
      group =>
        new Set(
          [...group.join('')].filter(
            letter =>
              group.join('').match(new RegExp(letter, 'g')).length ===
              group.length,
          ),
        ).size,
    )
    .reduce((total, current) => total + current, 0);

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '06/input.txt', partOne, partTwo, formatInput });
}
