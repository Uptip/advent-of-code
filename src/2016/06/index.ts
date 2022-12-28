import { times, groupBy, values } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string) => {
  const lines = input.split('\n');
  return times(lines[0].length)
    .map(i => lines.map(line => line[i]))
    .map(slot => groupBy(slot));
};

export const partOne = pipe(parseInput, slots =>
  slots
    .map(
      slot =>
        values(slot).reduce((acc, curr) => {
          if (curr.length > acc.length) {
            return curr;
          }
          return acc;
        }, [])[0],
    )
    .join(''),
);

export const partTwo = pipe(parseInput, slots =>
  slots
    .map(
      slot =>
        values(slot).reduce((acc, curr) => {
          if (curr.length < acc.length) {
            return curr;
          }
          return acc;
        }, new Array(1000).fill(undefined))[0],
    )
    .join(''),
);
