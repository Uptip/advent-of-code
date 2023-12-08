import fs from 'fs';
import path from 'path';

export const parseInput = (filename = 'input.txt') => {
  const [instructions, network] = fs
    .readFileSync(path.join(__dirname, filename), 'utf-8')
    .trim()
    .split('\n\n');

  return {
    instructions,
    network: network.split('\n').reduce((acc, curr) => {
      const [key, value] = curr.split(' = ');
      const [L, R] = value.replace(/\((\w+),\s(\w+)\)/, '$1,$2').split(',');
      return { ...acc, [key]: { L, R } };
    }, {}),
  };
};

export function partOne(filename?: string) {
  const { instructions, network } = parseInput(filename);

  let i = 0;
  let node = 'AAA';

  while (node !== 'ZZZ') {
    const { L, R } = network[node];
    node = instructions[i % instructions.length] === 'L' ? L : R;
    i++;
  }

  return i;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}

export function partTwo(filename?: string) {
  const { instructions, network } = parseInput(filename);

  return Object.keys(network)
    .filter(node => node.endsWith('A'))
    .map(node => {
      let i = 0;
      while (!node.endsWith('Z')) {
        const { L, R } = network[node];
        node = instructions[i % instructions.length] === 'L' ? L : R;
        i++;
      }
      return i;
    })
    .reduce((acc, curr) => lcm(acc, curr), 1);
}

console.log(
  `\n╓────────────────────╖`,
  '\n║   \x1b[1m🎄 Part one 🎄\x1b[0m   ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partOne('example-a.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partOne()}\x1b[0m`,
  '\n',
  `\n╓────────────────────╖`,
  '\n║ \x1b[1m🎄🎄 Part two 🎄🎄\x1b[0m ║',
  `\n╙────────────────────╜`,
  '\n\x1b[34mExample\x1b[0m',
  `\n${partTwo('example-b.txt')}\n`,
  `\n\x1b[34mInput\x1b[0m`,
  `\n\x1b[1m\x1b[32m${partTwo()}\x1b[0m`,
  '\n',
);
