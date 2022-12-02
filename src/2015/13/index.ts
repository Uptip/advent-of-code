import { allPermutations } from 'all-permutations';
import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

type ParsedInput = {
  [person1: string]: {
    [person2: string]: number;
  };
};

export const parseInput = (input: string): ParsedInput =>
  input.split('\n').reduce((acc, line) => {
    const [, person1, verb, quantity, person2] = line.match(
      /^(\w+).*(gain|lose)\s(\d+).*\s(\w+)\.$/,
    );
    return {
      ...acc,
      [person1]: {
        ...acc[person1],
        Me: 0,
        [person2]: (verb === 'gain' ? 1 : -1) * Number(quantity),
      },
    };
  }, {});

const calculate = (input: ParsedInput, shallIncludeMyself?: boolean) =>
  allPermutations(
    new Set(
      Object.keys(input)
        .concat(shallIncludeMyself ? 'Me' : null)
        .filter(Boolean),
    ),
  )
    .map((permutation: string[]) =>
      permutation.reduce(
        (acc, curr, index, array): number =>
          acc +
          (input[curr]?.[array[(index - 1 + array.length) % array.length]] ??
            0) +
          (input[curr]?.[array[(index + 1 + array.length) % array.length]] ??
            0),
        0,
      ),
    )
    .sort((a, b) => b - a)[0];

export const partOne: SolutionFunction = pipe(parseInput, calculate);

export const partTwo: SolutionFunction = pipe(parseInput, input =>
  calculate(input, true),
);
