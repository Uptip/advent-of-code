import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { last } from 'lodash';

export const parseInput = (input: string): string[] => input.split('');

const startCoordinates = '0,0';

const getVisitedCoordinates = (input: string[]) =>
  input.reduce(
    (acc, curr) => {
      const [x, y] = last(acc).split(',').map(Number);
      switch (curr) {
        case '^':
          return [...acc, `${x},${y + 1}`];
        case 'v':
          return [...acc, `${x},${y - 1}`];
        case '<':
          return [...acc, `${x - 1},${y}`];
        case '>':
          return [...acc, `${x + 1},${y}`];
        default:
          return acc;
      }
    },
    [startCoordinates],
  );

export const partOne: SolutionFunction = pipe(
  parseInput,
  input => new Set(getVisitedCoordinates(input)).size,
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  input =>
    new Set([
      ...getVisitedCoordinates(input.filter((_, index) => !Boolean(index % 2))),
      ...getVisitedCoordinates(input.filter((_, index) => Boolean(index % 2))),
    ]).size,
);
