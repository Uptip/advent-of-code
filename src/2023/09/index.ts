import fs from 'fs';
import path from 'path';

export const parseInput = (filename = 'input.txt') => {
  return fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number))
    .reduce((acc, set) => {
      let curr = [...set];
      let steps = [set];

      while (curr.some(x => x)) {
        let draft: number[] = [];
        for (let i = 1; i < curr.length; i++) {
          draft.push(curr[i] - curr[i - 1]);
        }
        steps.push(draft);
        curr = draft;
      }

      return acc.concat([steps]);
    }, [] as number[][][]);
};

export function partOne(filename?: string) {
  return parseInput(filename).reduce((acc, set) => {
    const steps = set.reverse();

    for (let i = 1; i < steps.length; i++) {
      steps[i].push(
        steps[i][steps[i].length - 1] + steps[i - 1][steps[i - 1].length - 1],
      );
    }

    return acc + steps[steps.length - 1][steps[steps.length - 1].length - 1];
  }, 0);
}

export function partTwo(filename?: string) {
  return parseInput(filename).reduce((acc, set) => {
    const steps = set.reverse();

    for (let i = 1; i < steps.length; i++) {
      steps[i].unshift(steps[i][0] - steps[i - 1][0]);
    }

    return acc + steps.reverse()[0][0];
  }, 0);
}

console.log(
  `\n╓────────────────────╖`,
  '\n║   \x1b[1m🎄 Part one 🎄\x1b[0m   ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${JSON.stringify(partOne('example.txt'), null, 2)}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partOne()}\x1b[0m`,
  '\n',
  `\n╓────────────────────╖`,
  '\n║ \x1b[1m🎄🎄 Part two 🎄🎄\x1b[0m ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partTwo('example.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partTwo()}\x1b[0m`,
  '\n',
);
