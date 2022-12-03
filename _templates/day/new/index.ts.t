---
to: src/<%= year%>/<%= day%>/index.ts
---
import { pipe } from 'ramda';

export const parseInput = (input: string) => input.split('\n');

export const partOne = pipe(parseInput, input => {
  return 0;
});

export const partTwo = pipe(parseInput, input => {
  return 0;
});
