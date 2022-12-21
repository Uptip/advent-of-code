import { pipe } from 'ramda';

export const parse = (input: string) =>
  input.split('\n').map(line => line.split('\t').map(Number));

export const example = ``;

export const partOne = pipe(parse, input =>
  input.reduce((acc, curr) => acc + Math.max(...curr) - Math.min(...curr), 0),
);

export const partTwo = pipe(parse, input =>
  input.reduce((acc, curr) => {
    for (let i = 0; i < curr.length; i++) {
      for (let j = 0; j < curr.length; j++) {
        if (i !== j && curr[i] % curr[j] === 0) {
          return acc + Math.max(curr[i], curr[j]) / Math.min(curr[i], curr[j]);
        }
      }
    }
  }, 0),
);
