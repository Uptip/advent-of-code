import * as R from 'remeda';
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

export const parseInput = (input: string) => {
  let output: { [id: string]: { [color: string]: number }[] } = {};

  input.split('\n').forEach(line => {
    const gameRegex = /Game\s(\d+):/g;
    const gameId = gameRegex.exec(line)[1];
    const chunks = line.split(': ')[1].split('; ');

    output[gameId] = chunks.map(chunk => {
      return chunk.split(', ').reduce((acc, item) => {
        const [count, color] = item.split(' ');
        acc[color] = Number(count);
        return acc;
      }, {} as { [color: string]: number });
    });
  });

  return output;
};

export const partOne = R.pipe(input, parseInput, games => {
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
});

export const partTwo = R.pipe(input, parseInput, games => {
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
});
