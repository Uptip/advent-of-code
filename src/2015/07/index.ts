import { pipe } from 'ramda';

const parseInput = (input: string) => input.split('\n');

const operations = {
  AND: (a: number, b: number) => a & b,
  OR: (a: number, b: number) => a | b,
  LSHIFT: (a: number, b: number) => a << b,
  RSHIFT: (a: number, b: number) => a >> b,
  NOT: (_: number, b: number) => b ^ 65535,
  SET: (_: number, b: number) => b,
};

const calculateWires = (
  input: string,
  wires = {},
): { [wire: string]: number } => {
  const clonedInput = [...parseInput(input)];

  while (clonedInput.length) {
    const [operation, a, operand, b, destination] = clonedInput
      .shift()
      .match(/([a-z0-9]*)\b\s?([A-Z]+)?\s?(\S+)\s->\s(\S+)/);

    if ([a, b].every(i => !i || wires.hasOwnProperty(i) || /\d+/.test(i))) {
      wires[destination] =
        wires[destination] ||
        operations[operand || 'SET'](...[a, b].map(i => wires[i] || +i));
    } else {
      clonedInput.push(operation);
    }
  }

  return wires;
};

export const partOne = pipe(calculateWires, ({ a }) => a);

export const partTwo = (input: string) => {
  const firstOutput = calculateWires(input);
  return calculateWires(input, { b: firstOutput.a }).a;
};
