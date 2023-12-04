import fs from 'fs';
import path from 'path';

export const parseInput = (filename = 'input.txt') => {
  return fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const [winningNumbers, ownedNumbers] = line
        .split(': ')[1]
        .split(' | ')
        .map(numbers => numbers.split(' ').map(Number).filter(Boolean));

      return ownedNumbers.filter(ownedNumber =>
        winningNumbers.includes(ownedNumber),
      );
    });
};

export function partOne(filename?: string) {
  return parseInput(filename).reduce((acc, ownedWinningNumbers) => {
    if (ownedWinningNumbers.length === 0) return acc;
    return acc + 2 ** (ownedWinningNumbers.length - 1);
  }, 0);
}

export function partTwo(filename?: string) {
  const cards = parseInput(filename);
  const copies = Array(cards.length).fill(1);

  cards.forEach((ownedWinningNumbers, cardIndex) => {
    for (let i = 0; i < ownedWinningNumbers.length; i++) {
      copies[cardIndex + i + 1] += copies[cardIndex];
    }
  });

  return copies.reduce((acc, curr) => acc + curr, 0);
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
