import { pipe } from 'ramda';
// @ts-ignore-next-line
import nerdamer from 'nerdamer/all.min';

export const parse = (input: string): { [key: string]: string } =>
  input
    .split('\n')
    .map(line => line.split(': '))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

const calculate = (monkeys: { [key: string]: string }, operation: string) => {
  const [term1, operand, term2] = operation.split(' ');
  const results = operation.match(/[+\-*/=]/);

  if (!results) return operation;

  return `(${calculate(monkeys, monkeys[term1])}) ${operand} (${calculate(
    monkeys,
    monkeys[term2],
  )} )`;
};

export const partOne = pipe(parse, input => eval(calculate(input, input.root)));

export const partTwo = pipe(
  input =>
    parse(
      input
        .replace(/humn: (\d+)\n/, 'humn: x\n')
        .replace(/root: (\w+) [+\-*/]{1} (\w+)\n/, 'root: $1 = $2\n'),
    ),
  input =>
    Math.round(
      JSON.parse(nerdamer.solve(calculate(input, input.root), 'x').text())[0],
    ),
);
