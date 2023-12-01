import { pipe } from 'ramda';

export const parseInput = (input: string) => input.split('\n');

export const example = ``;

export const partOne = pipe(parseInput, input => {
  return input
    .map(line => line.replace(/\D/g, ''))
    .map(line => `${line[0]}${line[line.length - 1]}`)
    .map(Number)
    .reduce((acc, curr) => acc + curr, 0);
});

export const partTwo = pipe(parseInput, input => {
  return input
    .map(line =>
      line
        .replace(/(one)/g, '$11$1')
        .replace(/(two)/g, '$12$1')
        .replace(/(three)/g, '$13$1')
        .replace(/(four)/g, '$14$1')
        .replace(/(five)/g, '$15$1')
        .replace(/(six)/g, '$16$1')
        .replace(/(seven)/g, '$17$1')
        .replace(/(eight)/g, '$18$1')
        .replace(/(nine)/g, '$19$1'),
    )
    .map(line => line.replace(/\D/g, ''))
    .map(line => `${line[0]}${line[line.length - 1]}`)
    .map(Number)
    .reduce((acc, curr) => acc + curr, 0);
});
