import { findLastIndex, get, times } from 'lodash';
import { pipe } from 'ramda';

const directions = ['east', 'south', 'west', 'north'];
const getNextHeading = (direction: string, turn: string) =>
  directions[
    (directions.indexOf(direction) +
      (turn === 'L' ? -1 : 1) +
      directions.length) %
      directions.length
  ];

export const parseInput = (input: string) => {
  const [rawGrid, rawInstructions] = input.split('\n\n');
  const grid = rawGrid.split('\n').map(row => row.split(''));
  const coordinates = [0, grid[0].indexOf('.')];
  const instructions = rawInstructions.split('').reduce((acc, curr) => {
    if (['L', 'R'].includes(curr)) {
      acc.push(curr);
    } else if (!acc.length || ['L', 'R'].includes(acc[acc.length - 1])) {
      acc.push(Number(curr));
    } else {
      acc[acc.length - 1] = 10 * acc[acc.length - 1] + Number(curr);
    }
    return acc;
  }, []);

  return {
    grid,
    instructions,
    coordinates,
    heading: 'east',
  };
};

const getNextPartOneCoordinates = (
  coordinates: number[],
  heading: string,
  grid: string[][],
) => {
  const [y, x] = coordinates;

  switch (heading) {
    case 'north':
      if (get(grid, [y - 1, x]) !== '#') {
        return [
          y > 0 && get(grid, [y - 1, x], '').trim()
            ? y - 1
            : findLastIndex(grid, line => line[x] === '.') >
              findLastIndex(grid, line => line[x] === '#')
            ? findLastIndex(grid, line => line[x] === '.')
            : y,
          x,
        ];
      }
      break;
    case 'east':
      if (get(grid, [y, x + 1]) !== '#') {
        return [
          y,
          x < grid[y].length - 1 && get(grid, [y, x + 1], '').trim()
            ? x + 1
            : grid[y].indexOf('.') < grid[y].indexOf('#')
            ? grid[y].indexOf('.')
            : x,
        ];
      }
      break;
    case 'south':
      if (get(grid, [y + 1, x]) !== '#') {
        return [
          y < grid.length - 1 && get(grid, [y + 1, x], '').trim()
            ? y + 1
            : grid.findIndex(line => line[x] === '.') <
              grid.findIndex(line => line[x] === '#')
            ? grid.findIndex(line => line[x] === '.')
            : y,
          x,
        ];
      }
      break;
    case 'west':
      if (get(grid, [y, x - 1]) !== '#') {
        return [
          y,
          x > 0 && get(grid, [y, x - 1]).trim()
            ? x - 1
            : grid[y].lastIndexOf('.') > grid[y].lastIndexOf('#')
            ? grid[y].lastIndexOf('.')
            : x,
        ];
      }
      break;
  }

  return coordinates;
};

export const partOne = pipe(
  parseInput,
  ({ grid, instructions, coordinates, heading }) =>
    instructions.reduce(
      (acc, curr) => {
        if (['L', 'R'].includes(curr)) {
          return { ...acc, heading: getNextHeading(acc.heading, curr) };
        }
        times(curr, () => {
          acc.coordinates = getNextPartOneCoordinates(
            acc.coordinates,
            acc.heading,
            grid,
          );
        });
        return acc;
      },
      { coordinates, heading, grid },
    ),
  ({ coordinates, heading }) =>
    1000 * (coordinates[0] + 1) +
    4 * (coordinates[1] + 1) +
    directions.indexOf(heading),
);

export const partTwo = pipe(parseInput, input => {
  return 0;
});
