import { pipe } from 'ramda';

export const parseInput = (input: string) =>
  input
    .split('\n')
    .map(line =>
      line.split('').map((instruction, index) => ({
        instruction,
        save: index === line.length - 1,
      })),
    )
    .flat();

const directions = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const partOneKeys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const partTwoKeys = [
  [, , 1, ,],
  [, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [, 'A', 'B', 'C'],
  [, , 'D', ,],
];

const getPassword =
  (keys: (number | string)[][]) =>
  (input: { instruction: string; save: boolean }[]) =>
    input.reduce(
      ({ x, y, password }, { instruction, save }) => {
        const [dx, dy] = directions[instruction];
        x = keys[y]?.[x + dx] ? x + dx : x;
        y = keys[y + dy]?.[x] ? y + dy : y;

        if (save) {
          password += keys[y][x];
        }

        return { x, y, password };
      },
      {
        x: keys.find(line => line.includes(5)).indexOf(5),
        y: keys.findIndex(line => line.includes(5)),
        password: '',
      },
    ).password;

export const partOne = pipe(parseInput, getPassword(partOneKeys));

export const partTwo = pipe(parseInput, getPassword(partTwoKeys));
