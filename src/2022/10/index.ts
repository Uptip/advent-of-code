import { chunk } from 'lodash';
import { last, pipe, range, times } from 'ramda';

export const parseInput = (input: string): [string, number][] =>
  input.split('\n').map(line => {
    const [instruction, value] = line.split(' ');
    return [instruction, Number(value)];
  });

const compute = (input: [string, number][]) =>
  input.reduce(
    (acc, curr) => {
      const [instruction, value] = curr;
      let nextValue = {
        ...acc,
        cycle: acc.cycle + 1,
        values: [...acc.values, last(acc.values)],
      };

      if (instruction === 'addx') {
        nextValue.cycle++;
        nextValue.values.push(last(nextValue.values) + value);
      }

      if ((nextValue.cycle - 20) % 40 === 0) {
        nextValue.readings.push(nextValue.cycle * last(nextValue.values));
      }
      return nextValue;
    },
    { cycle: 0, values: [1], readings: [] },
  );

export const partOne = pipe(parseInput, compute, ({ values }) =>
  [20, 60, 100, 140, 180, 220].reduce(
    (acc, curr) => acc + values[curr - 1] * curr,
    0,
  ),
);

export const partTwo = pipe(
  parseInput,
  compute,
  ({ values }) =>
    range(-1, values.length - 2).reduce(
      (acc, sprite) => [
        ...acc,
        [(sprite - 1) % 40, sprite % 40, (sprite + 1) % 40].includes(
          values[sprite],
        )
          ? '#'
          : '.',
      ],
      [],
    ),
  pixels =>
    '\n' +
    chunk(pixels, 40)
      .map(line => line.join(''))
      .join('\n'),
);
