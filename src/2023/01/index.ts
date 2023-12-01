import * as R from 'remeda';
import fs from 'fs';
import path from 'path';

const example = ``;

const input =
  example || fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

export const parseInput = (input: string) => input.split('\n');

const calculateCalibrationValue = (input: ReturnType<typeof parseInput>) =>
  input
    .map(line => {
      const digits = line.replace(/\D/g, '');
      return Number(`${digits.at(0)}${digits.at(-1)}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

export const partOne = R.pipe(input, parseInput, calculateCalibrationValue);

export const partTwo = R.pipe(
  input,
  parseInput,
  input =>
    input.map(line =>
      line
        .replace(/(one)/g, '$11$1')
        .replace(/(two)/g, '$12$1')
        .replace(/(three)/g, '$13$1')
        .replace(/(four)/g, '$14$1')
        .replace(/(five)/g, '$15$1')
        .replace(/(six)/g, '$16$1')
        .replace(/(seven)/g, '$17$1')
        .replace(/(eight)/g, '$18$1')
        .replace(/(nine)/g, '$19$1'),
    ),
  calculateCalibrationValue,
);
