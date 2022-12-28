import { times } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string) => input.split('\n');

const logGrid = (grid: boolean[][]) => {
  grid.forEach(row => {
    console.log(row.map(x => (x ? '##' : '  ')).join(''));
  });
};

const calculateGrid = (input: string[]) =>
  input.reduce(
    (acc, line) => {
      const [command, ...rest] = line.split(' ');
      switch (command) {
        case 'rect':
          const [width, height] = rest[0].split('x').map(Number);
          times(height, y => {
            times(width, x => {
              acc.grid[y][x] = true;
            });
          });
          break;
        case 'rotate':
          const [axis, index] = rest[1].split('=');
          const by = Number(rest[3]);

          switch (axis) {
            case 'y':
              const row = acc.grid[index];
              const newRow = times(50, i => row[(i - by + 50) % 50]);
              acc.grid[index] = newRow;
              break;
            case 'x':
              const column = acc.grid.map(row => row[index]);
              const newColumn = times(6, i => column[(i - by + 6) % 6]);
              acc.grid.forEach((row, i) => {
                row[index] = newColumn[i];
              });
              break;
          }
          break;
      }
      return acc;
    },
    { grid: times(6, () => times(50, () => false)) },
  ).grid;

export const partOne = pipe(
  parseInput,
  calculateGrid,
  grid => grid.flat().filter(Boolean).length,
);

export const partTwo = pipe(parseInput, calculateGrid, logGrid);
