import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): string[][] =>
  input.split('\n').map(day => day.split(' '));

export const partOne: SolutionFunction = pipe(parseInput, input => {
  let score = 0;
  input.forEach(round => {
    const [elf, me] = round;
    switch (elf) {
      case 'A':
        if (me === 'X') score += 1 + 3;
        if (me === 'Y') score += 2 + 6;
        if (me === 'Z') score += 3;
        break;
      case 'B':
        if (me === 'X') score += 1;
        if (me === 'Y') score += 2 + 3;
        if (me === 'Z') score += 3 + 6;
        break;
      case 'C':
        if (me === 'X') score += 1 + 6;
        if (me === 'Y') score += 2;
        if (me === 'Z') score += 3 + 3;
        break;
    }
  });
  return score;
});

export const partTwo: SolutionFunction = pipe(parseInput, input => {
  let score = 0;
  input.forEach(round => {
    const [elf, me] = round;
    switch (elf) {
      case 'A':
        if (me === 'X') score += 0 + 3;
        if (me === 'Y') score += 3 + 1;
        if (me === 'Z') score += 6 + 2;
        break;
      case 'B':
        if (me === 'X') score += 0 + 1;
        if (me === 'Y') score += 3 + 2;
        if (me === 'Z') score += 6 + 3;
        break;
      case 'C':
        if (me === 'X') score += 0 + 2;
        if (me === 'Y') score += 3 + 3;
        if (me === 'Z') score += 6 + 1;
        break;
    }
  });
  return score;
});
