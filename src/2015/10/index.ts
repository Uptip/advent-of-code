import { SolutionFunction } from '../../types';
import { times } from 'lodash';

const lookAndSay = (input: string) =>
  input
    .match(/(\d)\1*/g)
    .reduce((acc, curr) => `${acc}${curr.length}${curr[0]}`, '');

export const partOne: SolutionFunction = input =>
  times(40).reduce(acc => lookAndSay(acc), input).length;

export const partTwo: SolutionFunction = input =>
  times(50).reduce(acc => lookAndSay(acc), input).length;
