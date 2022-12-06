import { pipe, times } from 'ramda';

export const parseInput = (input: string) => input.split('');

const getMarker = (input: string[], size: number) => {
  for (let i = 0; i < input.length; i++) {
    if (
      new Set([...times(j => input[i - j], size)].filter(Boolean)).size === size
    ) {
      return i + 1;
    }
  }
};

export const partOne = pipe(parseInput, input => getMarker(input, 4));

export const partTwo = pipe(parseInput, input => getMarker(input, 14));
