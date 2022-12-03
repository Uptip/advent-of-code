import { pipe } from 'ramda';

export const parseInput = (input: string): string[] => input.split('\n');

export const partOne = pipe(
  parseInput,
  input => ({
    input,
    totalInput: [...Array(input[0].length).keys()].reduce(
      (acc, curr) => [
        ...acc,
        input
          .map(line => line[curr])
          .reduce((total, bit) => total + Number(bit), 0),
      ],
      [],
    ),
  }),
  ({ input, totalInput }) => totalInput.map(n => Number(n >= input.length / 2)),
  gamma => ({ gamma, epsilon: gamma.map(bit => 1 - bit) }),
  ({ gamma, epsilon }) =>
    parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2),
);

export const partTwo = pipe(
  parseInput,
  input =>
    [...Array(input[0].length).keys()].reduce(
      ({ o2Output, co2Output }, index) => ({
        o2Output: o2Output.filter(
          line =>
            Number(line[index]) ===
            Number(
              o2Output.reduce(
                (total, line) => total + Number(line[index]),
                0,
              ) >=
                o2Output.length / 2,
            ),
        ),
        co2Output: co2Output.filter(line =>
          co2Output.length === 1
            ? co2Output
            : Number(line[index]) ===
              Number(
                co2Output.reduce(
                  (total, line) => total + Number(line[index]),
                  0,
                ) <
                  co2Output.length / 2,
              ),
        ),
      }),
      { o2Output: input, co2Output: input },
    ),
  ({ o2Output, co2Output }) =>
    parseInt(o2Output[0], 2) * parseInt(co2Output[0], 2),
);
