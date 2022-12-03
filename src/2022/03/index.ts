import { pipe } from 'ramda';
import { chunk, intersection, sum } from 'lodash';

export const parseInput = (input: string): string[][] =>
  input.split('\n').map(line => line.split(''));

const scores = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const partOne = pipe(
  parseInput,
  input =>
    input
      .map(rucksack => chunk(rucksack, rucksack.length / 2))
      .map(compartments => intersection(...compartments)[0])
      .map(letter => scores.indexOf(letter)),
  sum,
);

export const partTwo = pipe(
  parseInput,
  input =>
    chunk(input, 3)
      .map(group => intersection(...group)[0])
      .map(letter => scores.indexOf(letter)),
  sum,
);
