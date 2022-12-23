import { range, times } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string) => {
  const grid = input.split('\n').map(line => line.split(''));
  const coordinates = new Set<string>();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '#') {
        coordinates.add(`${x},${y}`);
      }
    }
  }
  return coordinates;
};

let directions = ['N', 'S', 'W', 'E'];

const setToGrid = (coordinates: Set<string>) => {
  const minX = Math.min(
    ...[...coordinates.values()].map(c => Number(c.split(',')[0])),
  );
  const maxX = Math.max(
    ...[...coordinates.values()].map(c => Number(c.split(',')[0])),
  );
  const minY = Math.min(
    ...[...coordinates.values()].map(c => Number(c.split(',')[1])),
  );
  const maxY = Math.max(
    ...[...coordinates.values()].map(c => Number(c.split(',')[1])),
  );
  const grid = times(maxY - minY + 1, () => times(maxX - minX + 1, () => '.'));
  coordinates.forEach(elf => {
    const [x, y] = elf.split(',').map(Number);
    grid[y - minY][x - minX] = '#';
  });
  return grid;
};

const setToString = (coordinates: Set<string>) =>
  setToGrid(coordinates)
    .map(row => row.join(''))
    .join('\n');

const getNextRoundCoordinates = (coordinates: Set<string>) => {
  const proposedCoordinates = new Map<string, string>();
  const nextCoordinates = new Set<string>();

  coordinates.forEach(elf => {
    const [x, y] = elf.split(',').map(Number);

    if (
      !coordinates.has(`${x - 1},${y - 1}`) &&
      !coordinates.has(`${x - 1},${y}`) &&
      !coordinates.has(`${x - 1},${y + 1}`) &&
      !coordinates.has(`${x},${y - 1}`) &&
      !coordinates.has(`${x},${y + 1}`) &&
      !coordinates.has(`${x + 1},${y - 1}`) &&
      !coordinates.has(`${x + 1},${y}`) &&
      !coordinates.has(`${x + 1},${y + 1}`)
    ) {
      proposedCoordinates.set(elf, `${x},${y}`);
      return;
    }

    for (let direction of directions) {
      if (
        direction === 'N' &&
        !coordinates.has(`${x},${y - 1}`) &&
        !coordinates.has(`${x - 1},${y - 1}`) &&
        !coordinates.has(`${x + 1},${y - 1}`)
      ) {
        proposedCoordinates.set(elf, `${x},${y - 1}`);
        break;
      } else if (
        direction === 'W' &&
        !coordinates.has(`${x - 1},${y}`) &&
        !coordinates.has(`${x - 1},${y - 1}`) &&
        !coordinates.has(`${x - 1},${y + 1}`)
      ) {
        proposedCoordinates.set(elf, `${x - 1},${y}`);
        break;
      } else if (
        direction === 'E' &&
        !coordinates.has(`${x + 1},${y}`) &&
        !coordinates.has(`${x + 1},${y - 1}`) &&
        !coordinates.has(`${x + 1},${y + 1}`)
      ) {
        proposedCoordinates.set(elf, `${x + 1},${y}`);
        break;
      } else if (
        direction === 'S' &&
        !coordinates.has(`${x},${y + 1}`) &&
        !coordinates.has(`${x - 1},${y + 1}`) &&
        !coordinates.has(`${x + 1},${y + 1}`)
      ) {
        proposedCoordinates.set(elf, `${x},${y + 1}`);
        break;
      }
    }
  });

  for (let [elf, proposedCoordinate] of proposedCoordinates) {
    if (
      [...proposedCoordinates.values()].filter(
        coordinate => coordinate === proposedCoordinate,
      ).length === 1
    ) {
      nextCoordinates.add(proposedCoordinate);
    } else {
      nextCoordinates.add(elf);
    }
  }

  directions = directions.slice(1).concat(directions.slice(0, 1));
  // console.log('---')
  // console.log(setToString(nextCoordinates)
  return nextCoordinates;
};

export const partOne = pipe(
  parseInput,
  input => range(0, 11).reduce(getNextRoundCoordinates, input),
  coordinates =>
    setToGrid(coordinates).reduce(
      (acc, row) => acc + row.filter(cell => cell === '.').length,
      0,
    ),
);

export const partTwo = pipe(parseInput, input => {
  let i = 0;
  let grid = '';
  let nextCoordinates = input;
  directions = ['N', 'S', 'W', 'E'];

  while (true) {
    nextCoordinates = getNextRoundCoordinates(nextCoordinates);
    if (grid === setToString(nextCoordinates)) {
      return i;
    }
    grid = setToString(nextCoordinates);
    i++;
  }
});
