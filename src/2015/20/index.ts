import { pipe } from 'ramda';
// @ts-ignore
import findDividers from 'find-dividers';
import { sum } from 'lodash';

export const parseInput = (input: string) => Number(input);

export const partOne = pipe(parseInput, input => {
  let i = 0;
  while (true) {
    const dividers = findDividers(i).map(n => 10 * n);
    if (sum(dividers) >= input) return i;
    i++;
  }
});

export const partTwo = pipe(parseInput, input => {
  const used = new Map<number, number>();
  let i = 0;
  while (true) {
    const dividers: number[] = findDividers(i);
    dividers.forEach(i => used.set(i, (used.get(i) || 0) + 1));
    const total = sum(dividers.filter(i => used.get(i) <= 50).map(i => 11 * i));
    if (total >= input) return i;
    i++;
  }
});
