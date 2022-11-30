import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

type Entry = {
  digitOne: number;
  digitTwo: number;
  letter: string;
  password: string;
};

export const parseInput = (input: string): Entry[] =>
  input
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [rule, password] = line.split(': ');
      const [digits, letter] = rule.split(' ');
      const [digitOne, digitTwo] = digits
        .split('-')
        .map(Number)
        .filter(Boolean);

      return {
        digitOne,
        digitTwo,
        letter,
        password,
      };
    });

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    input.filter(({ digitOne, digitTwo, letter, password }) => {
      const regEx = new RegExp(letter, 'gi');
      const occurencesCount = (password.match(regEx) || []).length;
      return occurencesCount >= digitOne && occurencesCount <= digitTwo;
    }).length,
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  input =>
    input.filter(({ digitOne, digitTwo, letter, password }) => {
      return (
        (password.charAt(digitOne - 1) === letter) !==
        (password.charAt(digitTwo - 1) === letter)
      );
    }).length,
);
