import fs from 'fs';
import path from 'path';
import { pipe } from 'remeda';

export const parseInput = (filename = 'input.txt') =>
  fs.readFileSync(path.join(__dirname, filename), 'utf-8').trim().split('\n');

const calculateCalibrationValue = (input: ReturnType<typeof parseInput>) =>
  input
    .map(line => {
      const digits = line.replace(/\D/g, '');
      return Number(`${digits.at(0)}${digits.at(-1)}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

export function partOne(filename?: string) {
  const input = parseInput(filename);

  return calculateCalibrationValue(input);
}

export function partTwo(filename?: string) {
  return pipe(
    parseInput(filename),
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
}

console.log(
  `\n╓────────────────────╖`,
  '\n║   \x1b[1m🎄 Part one 🎄\x1b[0m   ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partOne('example-a.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partOne()}\x1b[0m`,
  '\n',
  `\n╓────────────────────╖`,
  '\n║ \x1b[1m🎄🎄 Part two 🎄🎄\x1b[0m ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partTwo('example-b.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partTwo()}\x1b[0m`,
  '\n',
);
