import { times } from 'lodash';
import { range, pipe } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line => line.split('').map(char => char === '#'));

const calculateNextState = (state: boolean[][], isPartTwo?: boolean) =>
  state.map((row, y) =>
    row.map((cell, x) => {
      const neighbours = range(-1, 2)
        .map(i =>
          range(-1, 2).map(j => {
            if (i === 0 && j === 0) return false;
            return state[y + i]?.[x + j];
          }),
        )
        .flat();

      const onNeighbours = neighbours.filter(Boolean).length;

      if (
        isPartTwo &&
        ((x === 0 && y === 0) ||
          (x === row.length - 1 && y === 0) ||
          (x === 0 && y === state.length - 1) ||
          (x === row.length - 1 && y === state.length - 1))
      ) {
        return true;
      }

      if (cell) {
        return onNeighbours === 2 || onNeighbours === 3;
      } else {
        return onNeighbours === 3;
      }
    }),
  );

export const partOne = pipe(
  parseInput,
  input =>
    times(100)
      .reduce(input => calculateNextState(input), input)
      .flat()
      .filter(Boolean).length,
);

export const partTwo = pipe(
  parseInput,
  input => {
    input[0][0] = true;
    input[0][input[0].length - 1] = true;
    input[input.length - 1][0] = true;
    input[input.length - 1][input[0].length - 1] = true;
    return input;
  },
  input =>
    times(100)
      .reduce(input => calculateNextState(input, true), input)
      .flat()
      .filter(Boolean).length,
);
