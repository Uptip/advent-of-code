import { last, pipe, times } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line => line.split(' '));

const calculateRopeCoordinates = (direction: string, coordinates: string[]) => {
  coordinates.forEach((knot, index) => {
    const [x, y] = knot.split(';').map(Number);
    const [x2, y2] = coordinates[index === 0 ? index : index - 1]
      .split(';')
      .map(Number);

    if (index === 0) {
      switch (direction) {
        case 'R':
          coordinates[index] = `${x + 1};${y}`;
          break;
        case 'L':
          coordinates[index] = `${x - 1};${y}`;
          break;
        case 'U':
          coordinates[index] = `${x};${y - 1}`;
          break;
        case 'D':
          coordinates[index] = `${x};${y + 1}`;
          break;
      }
    } else if (Math.abs(x - x2) > 1 || Math.abs(y - y2) > 1) {
      let dx = x2 - x;
      let dy = y2 - y;
      let nextX = Number(x);
      let nextY = Number(y);

      if (Math.abs(dx) > 1) {
        nextX += dx > 0 ? 1 : -1;
        if (Math.abs(dy) != 0) {
          nextY += dy > 0 ? 1 : -1;
        }
      } else if (Math.abs(dy) > 1) {
        nextY += dy > 0 ? 1 : -1;
        if (Math.abs(dx) != 0) {
          nextX += dx > 0 ? 1 : -1;
        }
      }

      coordinates[index] = `${nextX};${nextY}`;
    }
  });

  return coordinates;
};

const calculate = (input: string[][], ropeSize: number) => {
  const visited = new Set<string>();
  let coordinates = times(() => `0;0`, ropeSize);
  for (let [direction, distance] of input) {
    times(() => {
      coordinates = calculateRopeCoordinates(direction, coordinates);
      visited.add(last(coordinates));
    }, Number(distance));
  }

  return visited.size;
};

export const partOne = pipe(parseInput, input => calculate(input, 2));

export const partTwo = pipe(parseInput, input => calculate(input, 10));
