import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { chunk, sum } from 'lodash';

export const parseInput = (input: string): string[][] =>
  input
    .split('\n')
    .map(rucksack =>
      chunk(rucksack, rucksack.length / 2).map(row => row.join('')),
    );

const scores = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    input
      .map(compartments =>
        compartments[0]
          .split('')
          .find(letter => compartments[1].includes(letter)),
      )
      .map(letter => scores.indexOf(letter) + 1),
  sum,
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  input =>
    chunk(input, 3)
      .map(group => {
        const elves = group.map(elf => elf.join(''));
        return elves[0]
          .split('')
          .find(
            letter => elves[1].includes(letter) && elves[2].includes(letter),
          );
      })
      .map(letter => scores.indexOf(letter) + 1),
  sum,
);
