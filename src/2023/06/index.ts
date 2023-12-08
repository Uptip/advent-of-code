import fs from 'fs';
import path from 'path';
import { times } from 'remeda';

export const parseInput = (filename = 'input.txt') => {
  const [times, toBeats] = fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split(':')[1].split(' ').filter(Boolean).map(Number));

  return times.map((time, i) => {
    const toBeat = toBeats[i];
    return { time, toBeat };
  });
};

export function partOne(filename?: string) {
  return parseInput(filename).reduce((acc, { time, toBeat }) => {
    return (
      acc *
      times(time + 1, pressed => pressed * (time - pressed)).filter(
        ans => ans > toBeat,
      ).length
    );
  }, 1);
}

export function partTwo(filename?: string) {
  const { time, toBeat } = parseInput(filename).reduce(
    (acc, { time, toBeat }) => ({
      time: `${acc.time}${time}`,
      toBeat: `${acc.toBeat}${toBeat}`,
    }),
    { time: '', toBeat: '' },
  );

  let ans = 0;

  for (let pressed = 0; pressed < Number(time); pressed++) {
    const distance = pressed * (Number(time) - pressed);
    if (distance > Number(toBeat)) ans++;
  }

  return ans;
}

console.log(
  `\n╓────────────────────╖`,
  '\n║   \x1b[1m🎄 Part one 🎄\x1b[0m   ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${JSON.stringify(partOne('example.txt'))}\n`,
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
