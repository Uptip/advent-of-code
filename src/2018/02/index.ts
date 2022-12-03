import { countBy, difference, intersection } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string): string[][] =>
  input.split('\n').map(line => line.split(''));

export const partOne = pipe(
  parseInput,
  input =>
    input
      .map(line => Object.values(countBy(line)))
      .reduce(
        (acc, curr) => ({
          two: acc.two + Number(curr.includes(2)),
          three: acc.three + Number(curr.includes(3)),
        }),
        { two: 0, three: 0 },
      ),
  ({ two, three }) => two * three,
);

export const partTwo = pipe(parseInput, input => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const wordA = [...input[i]];
      const wordB = [...input[j]];

      const difference = wordA.reduce((acc, curr, index) => {
        if (curr === wordB[index]) {
          return acc;
        }
        return [...acc, index];
      }, []);

      if (difference.length === 1) {
        return wordA.filter((_, index) => index !== difference[0]).join('');
      }
    }
  }
});
