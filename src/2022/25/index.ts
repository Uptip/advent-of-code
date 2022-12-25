import { pipe } from 'ramda';

export const parseInput = (input: string) => input.split('\n');

const conversion = { '=': -2, '-': -1, '0': 0, '1': 1, '2': 2 };

const snafuToDecimal = (snafu: string) =>
  snafu
    .split('')
    .reverse()
    .reduce((total, curr, index) => total + 5 ** index * conversion[curr], 0);

const decimalToSnafu = (decimal: number) => {
  const digits = [];
  while (decimal > 0) {
    decimal += 2;
    digits.unshift(decimal % 5);
    decimal = Math.floor(decimal / 5);
  }
  return digits.map(digit => '=-012'[digit]).join('');
};

export const partOne = pipe(
  parseInput,
  input => input.reduce((total, curr) => total + snafuToDecimal(curr), 0),
  decimalToSnafu,
);

export const partTwo = pipe(
  parseInput,
  () => 'Merry Christmas, you filthy animal!',
);
