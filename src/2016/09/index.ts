import { pipe } from 'ramda';

export const parseInput = (input: string) => input.split('\n');

const getDecompressedSize = (line: string, recursive?: boolean): number => {
  let size = line.length;
  let i = 0;
  while (i < line.length) {
    const match = line.slice(i).match(/^\((\d+)x(\d+)\)/);
    if (match) {
      const [, length, repeat] = match.map(Number);
      const sub = line.slice(i + match[0].length, i + match[0].length + length);
      size -= match[0].length + length;
      if (recursive) {
        size += getDecompressedSize(sub, recursive) * repeat;
      } else {
        size += length * repeat;
      }
      i += match[0].length + length;
    } else {
      i++;
    }
  }
  return size;
};

export const partOne = pipe(parseInput, input =>
  input.reduce((acc, line) => acc + getDecompressedSize(line), 0),
);

export const partTwo = pipe(parseInput, input =>
  input.reduce((acc, line) => acc + getDecompressedSize(line, true), 0),
);
