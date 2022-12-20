import { pipe, times } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line => ({ value: Number(line) }));

const mix = (input: { value: number }[], loop = 1) => {
  const output = [...input];
  times(() => {
    for (const line of input) {
      const index = output.indexOf(line);
      output.splice(index, 1);
      output.splice((index + line.value) % output.length, 0, line);
    }
  }, loop);
  return output;
};

const getGroveCoordinates = (input: { value: number }[]) => {
  const index = input.findIndex(({ value }) => value === 0);
  return (
    input[(index + 1000) % input.length].value +
    input[(index + 2000) % input.length].value +
    input[(index + 3000) % input.length].value
  );
};

export const partOne = pipe(parseInput, mix, getGroveCoordinates);

export const partTwo = pipe(
  parseInput,
  input => input.map(line => ({ value: line.value * 811589153 })),
  input => mix(input, 10),
  getGroveCoordinates,
);
