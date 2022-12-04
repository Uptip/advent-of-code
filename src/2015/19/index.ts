import { pipe } from 'ramda';

export const parseInput = (
  input: string,
): { replacements: { [element: string]: string[] }; molecule: string } => ({
  replacements: input
    .split('\n')
    .slice(0, -2)
    .reduce((formula, line) => {
      const [element, replacement] = line.split(' => ');

      if (!formula[element]) formula[element] = [];
      formula[element].push(replacement);

      return formula;
    }, {}),
  molecule: input.split('\n').slice(-1)[0],
});

export const partOne = pipe(parseInput, input => {
  console.log(input);
  return 0;
});

export const partTwo = pipe(parseInput, input => {
  return 0;
});
