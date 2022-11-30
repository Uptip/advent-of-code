import { run } from '../utils/index';

type Line = {
  instruction: string;
  value: number;
};

enum Reason {
  InfiniteLoop,
  Ok,
}

type BootCodeOuput = {
  accumulator: number;
  reason: Reason;
};

export const formatInput = (input: string): Line[] =>
  input
    .replace(/\n$/, '')
    .split('\n')
    .map(line => {
      const [instruction, value] = line.split(' ');
      return {
        instruction,
        value: Number(value.replace('+', '')),
      };
    });

const runBootCode = (instructions: Line[]): BootCodeOuput => {
  const runInstructions = [];
  let currentLine = 0;
  let accumulator = 0;

  while (true) {
    if (runInstructions.includes(currentLine)) {
      return {
        accumulator,
        reason: Reason.InfiniteLoop,
      };
    }

    runInstructions.push(currentLine);
    const { instruction, value } = instructions[currentLine];

    switch (instruction) {
      case 'acc':
        accumulator += value;
        currentLine++;
        break;
      case 'jmp':
        currentLine += value;
        break;
      case 'nop':
      default:
        currentLine++;
        break;
    }

    if (currentLine === instructions.length - 1) {
      return {
        accumulator,
        reason: Reason.Ok,
      };
    }
  }
};

export const partOne = (instructions: any): any =>
  runBootCode(instructions).accumulator;

const toggle = (instruction: string): string =>
  instruction === 'nop' ? 'jmp' : 'nop';

export const partTwo = (instructions: any): any => {
  let currentLine = 0;
  while (currentLine < instructions.length) {
    const { instruction } = instructions[currentLine];
    if (!['nop', 'jmp'].includes(instruction)) {
      currentLine++;
      continue;
    }
    const clone = [...instructions];
    clone[currentLine] = {
      ...clone[currentLine],
      instruction: toggle(instruction),
    };
    const { reason, accumulator } = runBootCode(clone);
    if (reason === Reason.Ok) {
      return accumulator;
    }
    currentLine++;
  }
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '08/input.txt', partOne, partTwo, formatInput });
}
