import * as R from 'remeda';
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

export const parseInput = (input: string) => {
  let parsed = input.split('\n');

  let numberCoordinates: {
    number: number;
    startX: number;
    endX: number;
    y: number;
  }[] = [];
  let symbolCoordinates: {
    symbol: string;
    x: number;
    y: number;
  }[] = [];

  for (let y = 0; y < parsed.length; y++) {
    for (let x = 0; x < parsed[y].length; x++) {
      const current = parsed[y][x];
      if (current === '.') continue;

      if (/\d/.test(current)) {
        const currentNumberIndex = numberCoordinates.findIndex(
          ({ endX, y: numberY }) => y === numberY && endX === x - 1,
        );
        if (currentNumberIndex > -1) {
          numberCoordinates[currentNumberIndex].endX = x;
          numberCoordinates[currentNumberIndex].number =
            10 * numberCoordinates[currentNumberIndex].number + Number(current);
        } else {
          numberCoordinates.push({
            number: Number(current),
            startX: x,
            endX: x,
            y,
          });
        }
      }

      if (/[^\d.]/.test(current)) {
        symbolCoordinates.push({
          symbol: current,
          x,
          y,
        });
      }
    }
  }

  return { numberCoordinates, symbolCoordinates };
};

export const partOne = R.pipe(
  input,
  parseInput,
  ({ numberCoordinates, symbolCoordinates }) => {
    return numberCoordinates.reduce((acc, numberCoordinate) => {
      const { startX, endX, y } = numberCoordinate;
      const adjacentSymbols = symbolCoordinates.filter(
        symbolCoordinate =>
          (symbolCoordinate.y === y ||
            symbolCoordinate.y === y - 1 ||
            symbolCoordinate.y === y + 1) &&
          symbolCoordinate.x >= startX - 1 &&
          symbolCoordinate.x <= endX + 1,
      );

      if (adjacentSymbols.length > 0) {
        return acc + numberCoordinate.number;
      }

      return acc;
    }, 0);
  },
);

export const partTwo = R.pipe(
  input,
  parseInput,
  ({ numberCoordinates, symbolCoordinates }) => {
    return symbolCoordinates
      .filter(({ symbol }) => symbol === '*')
      .reduce((acc, symbolCoordinate) => {
        const { x, y } = symbolCoordinate;
        const adjacentNumbers = numberCoordinates.filter(
          numberCoordinate =>
            (numberCoordinate.y === y ||
              numberCoordinate.y === y - 1 ||
              numberCoordinate.y === y + 1) &&
            x >= numberCoordinate.startX - 1 &&
            x <= numberCoordinate.endX + 1,
        );

        if (adjacentNumbers.length === 2) {
          return acc + adjacentNumbers[0].number * adjacentNumbers[1].number;
        }

        return acc;
      }, 0);
  },
);
