import fs from 'fs';
import path from 'path';

export const parseInput = (filename = 'input.txt') => {
  const input = fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n');

  const numberCoordinates: {
    number: number;
    startX: number;
    endX: number;
    y: number;
  }[] = [];
  const symbolCoordinates: {
    symbol: string;
    x: number;
    y: number;
  }[] = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const current = input[y][x];
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

export function partOne(filename?: string) {
  const { numberCoordinates, symbolCoordinates } = parseInput(filename);

  return numberCoordinates.reduce((acc, numberCoordinate) => {
    const { startX, endX, y } = numberCoordinate;
    const adjacentSymbols = symbolCoordinates.filter(
      symbolCoordinate =>
        symbolCoordinate.y >= y - 1 &&
        symbolCoordinate.y <= y + 1 &&
        symbolCoordinate.x >= startX - 1 &&
        symbolCoordinate.x <= endX + 1,
    );

    if (adjacentSymbols.length > 0) {
      return acc + numberCoordinate.number;
    }

    return acc;
  }, 0);
}

export function partTwo(filename?: string) {
  const { numberCoordinates, symbolCoordinates } = parseInput(filename);

  return symbolCoordinates
    .filter(({ symbol }) => symbol === '*')
    .reduce((acc, symbolCoordinate) => {
      const { x, y } = symbolCoordinate;
      const adjacentNumbers = numberCoordinates.filter(
        numberCoordinate =>
          numberCoordinate.y >= y - 1 &&
          numberCoordinate.y <= y + 1 &&
          numberCoordinate.startX - 1 <= x &&
          numberCoordinate.endX + 1 >= x,
      );

      if (adjacentNumbers.length === 2) {
        return acc + adjacentNumbers[0].number * adjacentNumbers[1].number;
      }

      return acc;
    }, 0);
}

console.log(
  `\n╓────────────────────╖`,
  '\n║   \x1b[1m🎄 Part one 🎄\x1b[0m   ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partOne('example.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partOne()}\x1b[0m`,
  '\n',
  `\n╓────────────────────╖`,
  '\n║ \x1b[1m🎄🎄 Part two 🎄🎄\x1b[0m ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partTwo('example.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partTwo()}\x1b[0m`,
  '\n',
);
