import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { times } from 'lodash';

export const parseInput = (
  input: string,
): { action: string; start: string; end: string }[] =>
  input
    .split('\n')
    .filter(Boolean)
    .map(line =>
      line.match(/.*?(on|off|toggle)\s*?(\d+?,\d+?)\s*through\s*?(\d+?,\d+?)$/),
    )
    .map(([, action, start, end]) => ({
      action,
      start,
      end,
    }));

export const partOne: SolutionFunction = pipe(parseInput, input => {
  const grid = times(1000, () => times(1000, () => 0));

  input.forEach(({ action, start, end }) => {
    const [startX, startY] = start.split(',').map(Number);
    const [endX, endY] = end.split(',').map(Number);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        switch (action) {
          case 'on':
            grid[x][y] = 1;
            break;
          case 'off':
            grid[x][y] = 0;
            break;
          case 'toggle':
            grid[x][y] = Math.abs(grid[x][y] - 1);
            break;
          default:
            break;
        }
      }
    }
  });

  return grid.flat().filter(Boolean).length;
});

export const partTwo: SolutionFunction = pipe(parseInput, input => {
  const grid = times(1000, () => times(1000, () => 0));

  input.forEach(({ action, start, end }) => {
    const [startX, startY] = start.split(',').map(Number);
    const [endX, endY] = end.split(',').map(Number);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        switch (action) {
          case 'on':
            grid[x][y] += 1;
            break;
          case 'off':
            grid[x][y] = Math.max(0, grid[x][y] - 1);
            break;
          case 'toggle':
            grid[x][y] += 2;
            break;
          default:
            break;
        }
      }
    }
  });

  return grid.flat().reduce((acc, curr) => acc + curr, 0);
});
