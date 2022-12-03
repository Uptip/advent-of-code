import { countBy, intersection } from 'lodash';
import { pipe } from 'ramda';

type ClaimCoordinates = {
  id: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export const parseInput = (input: string): ClaimCoordinates[] =>
  input.split('\n').map(line => {
    const [, id, originX, originY, width, height] = line.match(
      /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/,
    );
    return {
      id,
      x1: Number(originX),
      x2: Number(originX) + Number(width),
      y1: Number(originY),
      y2: Number(originY) + Number(height),
    };
  });

const generateCoordinates = ({ x1, x2, y1, y2 }: ClaimCoordinates) => {
  const coordinates = [];
  for (let x = x1; x < x2; x++) {
    for (let y = y1; y < y2; y++) {
      coordinates.push(`${x},${y}`);
    }
  }
  return coordinates;
};

export const partOne = pipe(
  parseInput,
  input => input.flatMap(generateCoordinates),
  coordinates =>
    Object.values(countBy(coordinates)).filter(value => value > 1).length,
);

export const partTwo = pipe(parseInput, input => {
  const coordinates = input.flatMap(generateCoordinates);
  const coordinateCounts = countBy(coordinates);
  return input.find(
    ({ id, x1, x2, y1, y2 }) =>
      intersection(
        generateCoordinates({ id, x1, x2, y1, y2 }),
        coordinates.filter(coordinate => coordinateCounts[coordinate] > 1),
      ).length === 0,
  )!.id;
});
