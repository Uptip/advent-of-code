import { pipe } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line => {
    const [, from1, to1, from2, to2] = line.match(/^(\d+)-(\d+),(\d+)-(\d+)/);
    return {
      elf1: { from: Number(from1), to: Number(to1) },
      elf2: { from: Number(from2), to: Number(to2) },
    };
  });

export const partOne = pipe(
  parseInput,
  input =>
    input
      .map(
        ({ elf1, elf2 }) =>
          (elf1.to >= elf2.to && elf1.from <= elf2.from) ||
          (elf1.to <= elf2.to && elf1.from >= elf2.from),
      )
      .filter(Boolean).length,
);

export const partTwo = pipe(
  parseInput,
  input =>
    input
      .map(({ elf1, elf2 }) => elf1.from <= elf2.to && elf1.to >= elf2.from)
      .filter(Boolean).length,
);
