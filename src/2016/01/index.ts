import { last, range } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string): string[] => {
  return input.split(', ');
};

type Direction = 'N' | 'E' | 'S' | 'W';
const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
type Coordinate = { x: number; y: number };

const formatPositions = (input: {
  direction: Direction;
  positions: Coordinate[];
  instruction: string;
}) => {
  const [turn, ...distanceString] = input.instruction.split('');
  const distance = Number(distanceString.join(''));

  const direction =
    DIRECTIONS[
      (4 + DIRECTIONS.indexOf(input.direction) + (turn === 'R' ? 1 : -1)) % 4
    ];

  let x = last(input.positions).x;
  let y = last(input.positions).y;

  let addedPositions: Coordinate[] = [];

  switch (direction) {
    case 'N':
      addedPositions = range(y + 1, y + distance + 1).map(y => ({ x, y }));
      break;
    case 'E':
      addedPositions = range(x + 1, x + distance + 1).map(x => ({ x, y }));
      break;
    case 'S':
      addedPositions = range(y - 1, y - distance - 1, -1).map(y => ({ x, y }));
      break;
    case 'W':
      addedPositions = range(x - 1, x - distance - 1, -1).map(x => ({ x, y }));
      break;
  }

  return { addedPositions, direction };
};

export const partOne = pipe(
  parseInput,
  input =>
    input.reduce(
      (acc: { positions: Coordinate[]; direction: Direction }, instruction) => {
        const { direction, addedPositions } = formatPositions({
          direction: acc.direction,
          positions: acc.positions,
          instruction,
        });

        return {
          positions: [...acc.positions, ...addedPositions],
          direction,
        };
      },
      { positions: [{ x: 0, y: 0 }], direction: 'N' },
    ),
  positions =>
    Math.abs(last(positions.positions).x) +
    Math.abs(last(positions.positions).y),
);

export const partTwo = pipe(parseInput, input => {
  let visited = new Set<string>();
  visited.add('0,0');

  try {
    return input.reduce(
      (acc: { positions: Coordinate[]; direction: Direction }, instruction) => {
        const { direction, addedPositions } = formatPositions({
          direction: acc.direction,
          positions: acc.positions,
          instruction,
        });

        for (const position of addedPositions) {
          let key = `${position.x},${position.y}`;
          if (visited.has(key)) {
            throw Math.abs(position.x) + Math.abs(position.y);
          } else {
            visited.add(key);
          }
        }

        return {
          positions: [...acc.positions, ...addedPositions],
          direction,
        };
      },
      { positions: [{ x: 0, y: 0 }], direction: 'N' },
    );
  } catch (e) {
    return Number(e);
  }
});
