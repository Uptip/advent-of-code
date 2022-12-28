import { intersection } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line =>
    line.split(/[\[\]]/).reduce(
      (acc, curr, i) => {
        if (i % 2 === 0) {
          acc.good.push(curr);
        } else {
          acc.bad.push(curr);
        }
        return acc;
      },
      { good: [], bad: [] },
    ),
  );

const hasAbba = (segment: string) =>
  Boolean(/([a-z])(?!\1)([a-z])\2\1/.exec(segment));

export const partOne = pipe(parseInput, input =>
  input.reduce(
    (total, { good, bad }) =>
      total + Number(good.some(hasAbba) && !bad.some(hasAbba)),
    0,
  ),
);

const getAbas = (segment: string) => {
  const abas = [];
  for (let i = 0; i < segment.length - 2; i++) {
    const a = segment[i];
    const b = segment[i + 1];
    const c = segment[i + 2];
    if (a === c && a !== b) {
      abas.push(a + b + c);
    }
  }
  return abas;
};

export const partTwo = pipe(parseInput, input =>
  input.reduce((total, { good, bad }) => {
    const goodAbas = good.flatMap(getAbas);
    const badBabs = bad.flatMap(getAbas).map(aba => aba[1] + aba[0] + aba[1]);
    return total + Number(intersection(goodAbas, badBabs).length > 0);
  }, 0),
);
