import { chunk, times } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line => line.match(/\d+/g).map(Number));

const isValid = (line: number[]) => {
  const sorted = line.sort((a, b) => a - b);
  return sorted[0] + sorted[1] > sorted[2];
};

export const partOne = pipe(parseInput, input =>
  input.reduce((acc, line) => acc + Number(isValid(line)), 0),
);

export const partTwo = pipe(
  parseInput,
  input => times(3).flatMap(i => input.map(line => line[i])),
  ordered => chunk(ordered, 3),
  chunks => chunks.reduce((acc, line) => acc + Number(isValid(line)), 0),
);
