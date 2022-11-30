import { run } from '../utils/index';

export const formatInput = (input: string): number[] =>
  input.replace(/\n$/, '').split('\n').map(Number);

const findSumTerms = ({ result, sample }) => {
  for (let i = 0; i < sample.length; i++) {
    for (let j = i + 1; j < sample.length; j++) {
      const one = sample[i];
      const two = sample[j];
      if (one + two === result) {
        return { one, two };
      }
    }
  }
  throw Error('No match found');
};

export const partOne = (input: number[]): number => {
  for (let i = 25; i <= input.length; i++) {
    const result = input[i];
    const sample = input.slice(i - 25, i);

    try {
      findSumTerms({ result, sample });
    } catch (err) {
      return result;
    }
  }
};

type FindSumSampleInput = {
  result: number;
  input: number[];
};

const findSumSample = ({ result, input }: FindSumSampleInput): number => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const sample = input.slice(i, j);
      const sum = sample.reduce((total, curr) => total + curr, 0);

      if (sum > result) {
        break;
      }

      if (sum === result) {
        const sortedSample = sample.sort((a: number, b: number) => a - b);
        return sortedSample[0] + sortedSample[sortedSample.length - 1];
      }
    }
  }
};

export const partTwo = (input: number[]): number =>
  findSumSample({ result: partOne(input), input });

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '09/input.txt', partOne, partTwo, formatInput });
}
