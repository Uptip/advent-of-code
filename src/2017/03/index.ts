import { pipe } from 'ramda';

export const parse = (input: string): number => Number(input);

const directions = ['right', 'up', 'left', 'down'];

const manhattan = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(Number(x1) - Number(x2)) + Math.abs(Number(y1) - Number(y2));

const getNextDirection = (grid, currentCoordinates, direction) => {
  if (
    (direction === 'right' &&
      !grid.has(
        [currentCoordinates[0], currentCoordinates[1] + 1].join(','),
      )) ||
    (direction === 'up' &&
      !grid.has(
        [currentCoordinates[0] - 1, currentCoordinates[1]].join(','),
      )) ||
    (direction === 'left' &&
      !grid.has(
        [currentCoordinates[0], currentCoordinates[1] - 1].join(','),
      )) ||
    (direction === 'down' &&
      !grid.has([currentCoordinates[0] + 1, currentCoordinates[1]].join(',')))
  ) {
    return directions[(directions.indexOf(direction) + 1) % directions.length];
  }
  return direction;
};

export const partOne = pipe(parse, input => {
  let direction = directions[0];
  const currentCoordinates = [-1, 0];
  const grid = new Map();
  const coordinates = new Map();

  for (let i = 0; i < input; i++) {
    switch (direction) {
      case 'right':
        currentCoordinates[0] += 1;
        break;
      case 'up':
        currentCoordinates[1] += 1;
        break;
      case 'left':
        currentCoordinates[0] -= 1;
        break;
      case 'down':
        currentCoordinates[1] -= 1;
        break;
    }

    coordinates.set(i + 1, currentCoordinates.join(','));
    grid.set(currentCoordinates.join(','), i + 1);
    direction = getNextDirection(grid, currentCoordinates, direction);
  }

  const target = coordinates.get(input).split(',').map(Number);
  return manhattan(target[0], target[1], 0, 0);
});

const getAdjacentSum = (grid, currentCoordinates) =>
  Math.max(
    (grid.get(
      [currentCoordinates[0] - 1, currentCoordinates[1] - 1].join(','),
    ) || 0) +
      (grid.get([currentCoordinates[0] - 1, currentCoordinates[1]].join(',')) ||
        0) +
      (grid.get(
        [currentCoordinates[0] - 1, currentCoordinates[1] + 1].join(','),
      ) || 0) +
      (grid.get([currentCoordinates[0], currentCoordinates[1] - 1].join(',')) ||
        0) +
      (grid.get([currentCoordinates[0], currentCoordinates[1] + 1].join(',')) ||
        0) +
      (grid.get(
        [currentCoordinates[0] + 1, currentCoordinates[1] - 1].join(','),
      ) || 0) +
      (grid.get([currentCoordinates[0] + 1, currentCoordinates[1]].join(',')) ||
        0) +
      (grid.get(
        [currentCoordinates[0] + 1, currentCoordinates[1] + 1].join(','),
      ) || 0),
    1,
  );

export const partTwo = pipe(parse, input => {
  let direction = directions[0];
  const currentCoordinates = [-1, 0];
  const grid = new Map();

  for (let i = 0; i < input; i++) {
    switch (direction) {
      case 'right':
        currentCoordinates[0] += 1;
        break;
      case 'up':
        currentCoordinates[1] += 1;
        break;
      case 'left':
        currentCoordinates[0] -= 1;
        break;
      case 'down':
        currentCoordinates[1] -= 1;
        break;
    }

    const adjacentSum = getAdjacentSum(grid, currentCoordinates);

    if (adjacentSum > input) {
      return adjacentSum;
    }

    grid.set(currentCoordinates.join(','), adjacentSum);
    direction = getNextDirection(grid, currentCoordinates, direction);
  }
});
