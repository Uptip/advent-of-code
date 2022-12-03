import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

const correctSue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

export const parseInput = (input: string): { [key: string]: number }[] =>
  input.split('\n').map(sue => {
    const [, index, thing1, value1, thing2, value2, thing3, value3] = sue.match(
      /^Sue (\d+): (\w+): (-?\d+), (\w+): (-?\d+), (\w+): (-?\d+)/,
    );
    return {
      index: Number(index),
      [thing1]: Number(value1),
      [thing2]: Number(value2),
      [thing3]: Number(value3),
    };
  });

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    input.find(sue =>
      Object.keys(correctSue).every(
        thing => sue[thing] === correctSue[thing] || sue[thing] === undefined,
      ),
    ),
  ({ index }) => index,
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  input =>
    input.find(sue =>
      Object.keys(correctSue).every(thing => {
        if (sue[thing] == undefined) return true;
        switch (thing) {
          case 'cats':
          case 'trees':
            return sue[thing] > correctSue[thing];
          case 'pomeranians':
          case 'goldfish':
            return sue[thing] < correctSue[thing];
          default:
            return sue[thing] === correctSue[thing];
        }
      }),
    ),
  ({ index }) => index,
);
