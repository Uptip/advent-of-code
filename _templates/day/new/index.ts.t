---
to: src/<%= year%>/<%= day%>/index.ts
---
import fs from 'fs';
import path from 'path';

export const parseInput = (filename = 'input.txt') => {
  const input = fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n');

  return input;
};

export function partOne(filename?: string) {
  const output = parseInput(filename);
  return output;
}

export function partTwo(filename?: string) {
  const output = parseInput(filename);
  return output;
}

console.log(
  `\n╓────────────────────╖`,
  '\n║   \x1b[1m🎄 Part one 🎄\x1b[0m   ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partOne('example.txt')}\n`,
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
