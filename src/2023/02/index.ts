import fs from 'fs';
import path from 'path';

export function parseInput(filename = 'input.txt') {
  const input = fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n');

  return input.reduce((acc, line) => {
    const gameRegex = /Game\s(\d+):/g;
    const gameId = gameRegex.exec(line)[1];
    const chunks = line.split(': ')[1].split('; ');

    acc[gameId] = chunks.map(chunk => {
      return chunk.split(', ').reduce((acc, item) => {
        const [count, color] = item.split(' ');
        acc[color] = Number(count);
        return acc;
      }, {} as { [color: string]: number });
    });

    return acc;
  }, {} as { [id: string]: { [color: string]: number }[] });
}

export function partOne(filename?: string) {
  const games = parseInput(filename);
  const instructions = {
    blue: 14,
    green: 13,
    red: 12,
  };

  return Object.entries(games).reduce((acc, [id, game]) => {
    if (
      game.some(set =>
        Object.entries(set).some(
          ([color, count]) => instructions[color] < count,
        ),
      )
    ) {
      return acc;
    }

    return acc + Number(id);
  }, 0);
}

export function partTwo(filename?: string) {
  const games = parseInput(filename);

  return Object.entries(games).reduce((acc, [_, game]) => {
    const { red, green, blue } = game.reduce(
      (acc, set) => {
        return {
          red: Math.max(acc.red, set.red || 0),
          green: Math.max(acc.green, set.green || 0),
          blue: Math.max(acc.blue, set.blue || 0),
        };
      },
      { red: 0, green: 0, blue: 0 },
    );

    return acc + red * green * blue;
  }, 0);
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
