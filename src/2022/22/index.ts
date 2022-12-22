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

type State = {
  coordinates: number[];
  heading: string;
  grid: string[][];
};

const getNextPartOneCoordinates = (
  coordinates: number[],
  heading: string,
  grid: string[][],
) => {
  const [y, x] = coordinates;

  switch (heading) {
    case 'north':
      if (get(grid, [y - 1, x]) !== '#')
        return [
          y > 0 && get(grid, [y - 1, x], '').trim()
            ? y - 1
            : findLastIndex(grid, line => line[x] === '.') >
              findLastIndex(grid, line => line[x] === '#')
            ? findLastIndex(grid, line => line[x] === '.')
            : y,
          x,
        ];
      break;

    case 'east':
      if (get(grid, [y, x + 1]) !== '#')
        return [
          y,
          x < grid[y].length - 1 && get(grid, [y, x + 1], '').trim()
            ? x + 1
            : grid[y].indexOf('.') < grid[y].indexOf('#')
            ? grid[y].indexOf('.')
            : x,
        ];
      break;

    case 'south':
      if (get(grid, [y + 1, x]) !== '#')
        return [
          y < grid.length - 1 && get(grid, [y + 1, x], '').trim()
            ? y + 1
            : grid.findIndex(line => line[x] === '.') <
              grid.findIndex(line => line[x] === '#')
            ? grid.findIndex(line => line[x] === '.')
            : y,
          x,
        ];
      break;

    case 'west':
      if (get(grid, [y, x - 1]) !== '#')
        return [
          y,
          x > 0 && get(grid, [y, x - 1]).trim()
            ? x - 1
            : grid[y].lastIndexOf('.') > grid[y].lastIndexOf('#')
            ? grid[y].lastIndexOf('.')
            : x,
        ];
      break;
  }

  return coordinates;
};

export const partOne = pipe(
  parseInput,
  ({ grid, instructions, coordinates, heading }) => {
    return instructions.reduce(
      (acc: State, curr: any) => {
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
    );
  },
  ({ coordinates, heading }) =>
    1000 * (coordinates[0] + 1) +
    4 * (coordinates[1] + 1) +
    directions.indexOf(heading),
);

const getNextPartTwoCoordinates = (
  coordinates: number[],
  heading: string,
  grid: string[][],
) => {
  const nextCoordinates = [...coordinates];
  const [y, x] = nextCoordinates;
  let nextHeading = `${heading}`;
  let nextX = x;
  let nextY = y;

  switch (heading) {
    case 'north':
      if (get(grid, [y - 1, x]) === '.') {
        nextY = y - 1;
        break;
      }

      if (!get(grid, [y - 1, x], '').trim()) {
        if (x < 50) {
          // D-top to C-left
          // [100,{25}] to [{75},50]
          nextY = x + 50;
          nextX = 50;
          nextHeading = 'east';
          break;
        } else if (x < 100) {
          // A-top to F-left
          // [0,{75}] to [{175},0]
          nextY = x + 100;
          nextX = 0;
          nextHeading = 'east';
          break;
        } else {
          // B-top to F-bottom
          // [0,{125}] to [199,{25}]
          nextY = 199;
          nextX = x - 100;
          nextHeading = 'north';
          break;
        }
      }
      break;

    case 'east':
      if (get(grid, [y, x + 1]) === '.') {
        nextX = x + 1;
        break;
      }

      if (!get(grid, [y, x + 1], '').trim()) {
        if (y < 50) {
          // B-right to E-right
          // [{25}, 149] to [{125}, 99]
          nextY = y + 100;
          nextX = 99;
          nextHeading = 'west';
          break;
        } else if (y < 100) {
          // C-right to B-bottom
          // [{75}-99] to [49-{125}]
          nextY = x - 50;
          nextX = 49;
          nextHeading = 'north';
          break;
        } else if (y < 150) {
          // E-right to B-right
          // [{125}, 99] to [{25},149]
          nextY = y - 100;
          nextX = 149;
          nextHeading = 'west';
          break;
        } else {
          // F-right to E-bottom
          // [{175}, 49] to [149-{75}]
          nextY = 149;
          nextX = y - 100;
          nextHeading = 'north';
          break;
        }
      }
      break;

    case 'south':
      if (get(grid, [y + 1, x]) === '.') {
        nextY = y + 1;
        break;
      }

      if (!get(grid, [y + 1, x], '').trim()) {
        if (x < 50) {
          // F-bottom to B-top
          // [199,{25}] to [0,{125}]
          nextY = 0;
          nextX = x + 100;
          nextHeading = 'south';
          break;
        } else if (x < 100) {
          // E-bottom to F-right
          // [149-{75}] to [{175}, 49]
          nextY = x + 100;
          nextX = 49;
          nextHeading = 'west';
          break;
        } else {
          // B-bottom to C-right
          // [49-{125}] to [{75}, 99]
          nextY = x - 50;
          nextX = 99;
          nextHeading = 'west';
          break;
        }
      }
      break;

    case 'west':
      if (get(grid, [y, x - 1]) === '.') {
        nextX = x - 1;
        break;
      }

      if (!get(grid, [y, x - 1], '').trim()) {
        if (y < 50) {
          // A-left to D-left
          // [{25}, 50] to [{125}, 0]
          nextY = y + 100;
          nextX = 0;
          nextHeading = 'east';
          break;
        } else if (y < 100) {
          // C-left to D-top
          // [{75}, 50] to [100,{25}]
          nextY = 100;
          nextX = y - 50;
          nextHeading = 'south';
          break;
        } else if (y < 150) {
          // D-left to E-left
          // [{125}, 0] to [{25}, 50]
          nextY = y - 100;
          nextX = 50;
          nextHeading = 'east';
          break;
        } else {
          // F-left to A-top
          // [{175}, 0] to [0,{75}]
          nextY = 0;
          nextX = y - 100;
          nextHeading = 'south';
          break;
        }
      }
      break;
  }

  if (grid[nextY][nextX] === '#') {
    return { nextCoordinates: [y, x], nextHeading: heading };
  }

  return { nextCoordinates: [nextY, nextX], nextHeading };
};

export const partTwo = pipe(
  parseInput,
  ({ grid, instructions, coordinates, heading }) =>
    instructions.reduce(
      (acc: State, curr: any) => {
        if (['L', 'R'].includes(curr)) {
          return { ...acc, heading: getNextHeading(acc.heading, curr) };
        }

        times(curr, () => {
          const { nextCoordinates, nextHeading } = getNextPartTwoCoordinates(
            acc.coordinates,
            acc.heading,
            grid,
          );
          acc.coordinates = nextCoordinates;
          acc.heading = nextHeading;
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
