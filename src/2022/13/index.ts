import { chunk, isArray, isNumber } from 'lodash';
import { pipe, times } from 'ramda';

export const parseInput = (input: string) =>
  input
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));

const compare = (left: any, right: any) => {
  if (isArray(left) && isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let result = compare(left[i], right[i]);
      if (result !== undefined) {
        return result;
      }
    }
    if (left.length < right.length) {
      return true;
    }
    if (left.length > right.length) {
      return false;
    }
    return undefined;
  }

  if (isNumber(left) && isNumber(right)) {
    return left > right ? false : left < right ? true : undefined;
  }

  return compare(
    isNumber(left) ? [left] : left,
    isNumber(right) ? [right] : right,
  );
};

export const partOne = pipe(parseInput, input =>
  chunk(input, 2).reduce(
    (acc, [left, right], index) =>
      acc + (index + 1) * Number(compare(left, right)),
    0,
  ),
);

export const partTwo = pipe(
  input =>
    parseInput(`${input}
[[2]]
[[6]]`),
  input =>
    input
      .sort((left, right) => {
        const result = compare(left, right);
        return result !== undefined ? (result ? -1 : 1) : 0;
      })
      .map(line => JSON.stringify(line)),
  sorted => (sorted.indexOf('[[2]]') + 1) * (sorted.indexOf('[[6]]') + 1),
);
