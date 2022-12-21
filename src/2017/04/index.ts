import { pipe } from 'ramda';

export const parse = (input: string) =>
  input.split('\n').map(line => line.split(' '));

export const partOne = pipe(
  parse,
  input =>
    input.filter(
      passphrase => [...new Set(passphrase)].length === passphrase.length,
    ).length,
);

export const partTwo = pipe(
  parse,
  input =>
    input.filter(passphrase => {
      const sorted = passphrase.map(word => word.split('').sort().join(''));
      return [...new Set(sorted)].length === sorted.length;
    }).length,
);
