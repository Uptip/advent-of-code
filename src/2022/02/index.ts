import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

export const parseInput = (input: string): string[][] =>
  input.split('\n').map(day => day.split(' '));

export const partOne: SolutionFunction = pipe(parseInput, input =>
  input.reduce((score, [elf, me]) => {
    switch (elf) {
      case 'A':
        if (me === 'X') return score + 1 + 3;
        if (me === 'Y') return score + 2 + 6;
        if (me === 'Z') return score + 3 + 0;
        break;
      case 'B':
        if (me === 'X') return score + 1 + 0;
        if (me === 'Y') return score + 2 + 3;
        if (me === 'Z') return score + 3 + 6;
        break;
      case 'C':
        if (me === 'X') return score + 1 + 6;
        if (me === 'Y') return score + 2 + 0;
        if (me === 'Z') return score + 3 + 3;
        break;
    }
  }, 0),
);

export const partTwo: SolutionFunction = pipe(parseInput, input =>
  input.reduce((score, [elf, me]) => {
    switch (elf) {
      case 'A':
        if (me === 'X') return score + 0 + 3;
        if (me === 'Y') return score + 3 + 1;
        if (me === 'Z') return score + 6 + 2;
        break;
      case 'B':
        if (me === 'X') return score + 0 + 1;
        if (me === 'Y') return score + 3 + 2;
        if (me === 'Z') return score + 6 + 3;
        break;
      case 'C':
        if (me === 'X') return score + 0 + 2;
        if (me === 'Y') return score + 3 + 3;
        if (me === 'Z') return score + 6 + 1;
        break;
    }
  }, 0),
);
