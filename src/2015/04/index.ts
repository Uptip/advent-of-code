import { SolutionFunction } from '../../types';
import md5 from 'md5';

const getResult = (input: string, prefix: string) => {
  let i = 0;
  while (true) {
    if (md5(input + i).startsWith(prefix)) {
      return i;
    }
    i++;
  }
};

export const partOne: SolutionFunction = input => getResult(input, '00000');

export const partTwo: SolutionFunction = input => getResult(input, '000000');
