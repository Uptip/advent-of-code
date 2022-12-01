import { chunk } from 'lodash';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const straights = [
  ...chunk(alphabet, 3),
  ...chunk(alphabet.slice(1), 3),
  ...chunk(alphabet.slice(2), 3),
]
  .filter(straight => straight.length === 3)
  .map(straight => straight.join(''));
const forbiddenLetters = ['i', 'o', 'l'];
const pairs = alphabet.split('').map(letter => `${letter}${letter}`);

const isValid = (password: string) =>
  straights.some(straight => password.includes(straight)) &&
  !forbiddenLetters.some(letter => password.includes(letter)) &&
  pairs.filter(pair => password.includes(pair)).length > 1;

const incrementPassword = (password: string) => {
  const lastLetter = password.slice(-1);
  const rest = password.slice(0, -1);
  const nextLetter = alphabet[alphabet.indexOf(lastLetter) + 1];
  return nextLetter ? `${rest}${nextLetter}` : `${incrementPassword(rest)}a`;
};

const findNextValidPassword = (password: string) => {
  while (!isValid(password)) {
    password = incrementPassword(password);
  }
  return password;
};

export const partOne = (password: string): string =>
  findNextValidPassword(password);

export const partTwo = (password: string): string =>
  findNextValidPassword(incrementPassword(findNextValidPassword(password)));
